import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { subDays, parse, differenceInDays } from "date-fns";
import { db } from "@/db/drizzle";
import { and, eq, gte, lte, sql, sum } from "drizzle-orm";
import { accounts, transactions } from "@/db/schema";
import { calculatePercentageChange } from "@/lib/utils";

const app = new Hono();

app.get(
  "/",
  clerkMiddleware(),
  zValidator(
    "query",
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })
  ),
  async (c) => {
    const auth = getAuth(c);
    if (!auth) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { from, to, accountId } = c.req.valid("query");

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from
      ? parse(from, "yyyy-MM-dd", defaultFrom)
      : defaultFrom;
    const endDate = to ? parse(to, "yyyy-MM-dd", defaultTo) : defaultTo;

    const periodLength = differenceInDays(endDate, startDate);
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    async function fetchFinancialData(
      userId: string,
      startDate: Date,
      endDate: Date
    ) {
      const data = await db
        .select({
          income:
            sql`SUM(CASE WHEN ${transactions.amount} >= 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
              Number
            ),
          expenses:
            sql`SUM(CASE WHEN ${transactions.amount} < 0 THEN ${transactions.amount} ELSE 0 END)`.mapWith(
              Number
            ),
          remaining: sum(transactions.amount).mapWith(Number),
        })
        .from(transactions)
        .innerJoin(accounts, eq(transactions.accountId, accounts.id))
        .where(
          and(
            accountId ? eq(transactions.accountId, accountId) : undefined,
            eq(accounts.userId, userId),
            gte(transactions.date, startDate),
            lte(transactions.date, endDate)
          )
        )
        .groupBy(transactions.accountId);

      return data;
    }

    const [currentPeriod, lastPeriod] = await Promise.all([
      fetchFinancialData(auth.userId!, startDate, endDate),
      fetchFinancialData(auth.userId!, lastPeriodStart, lastPeriodEnd),
    ]);

    console.log({
      currentPeriod,
      lastPeriod,
    });

    // const incomeChange = calculatePercentageChange(
    //   currentPeriod.income,
    //   lastPeriod.income
    // );

    // const expensesChange = calculatePercentageChange(
    //   currentPeriod.expenses,
    //   lastPeriod.expenses
    // );

    // const remainingChange = calculatePercentageChange(
    //   currentPeriod.remaining,
    //   lastPeriod.remaining
    // );

    return c.json({
      currentPeriod,
      lastPeriod,
      // incomeChange,
      // expensesChange,
      // remainingChange,
    });
  }
);

export default app;
