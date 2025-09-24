const express = require('express');

const router = express.Router();

/**
 * Note: These endpoints serve inline mock data for the Usage Dashboard.
 * They are unauthenticated and have no DB layer. Returns JSON only.
 * Naming aligns with mock variable names used by the frontend.
 */

/**
 * @swagger
 * tags:
 *   name: Mock Data
 *   description: Usage Dashboard mock datasets
 */

/**
 * @swagger
 * /api/mockTimeSeries:
 *   get:
 *     summary: Time-series usage data (e.g., DAU/WAU/MAU)
 *     description: Returns mock time series data for DAU/WAU/MAU to populate line charts and growth curves.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: A list of time-series points grouped by metric
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 range:
 *                   type: string
 *                   description: Time granularity or date range
 *                   example: last_30_days
 *                 series:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       metric:
 *                         type: string
 *                         description: Metric name (DAU, WAU, MAU)
 *                         example: DAU
 *                       points:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                               format: date
 *                               example: 2025-09-01
 *                             value:
 *                               type: number
 *                               example: 123
 */
router.get('/api/mockTimeSeries', (req, res) => {
  const data = {
    range: 'last_30_days',
    series: [
      {
        metric: 'DAU',
        points: Array.from({ length: 30 }).map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().slice(0, 10),
          value: 100 + Math.floor(Math.random() * 50) + i,
        })),
      },
      {
        metric: 'WAU',
        points: Array.from({ length: 30 }).map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().slice(0, 10),
          value: 500 + Math.floor(Math.random() * 100) + Math.floor(i / 7) * 10,
        })),
      },
      {
        metric: 'MAU',
        points: Array.from({ length: 30 }).map((_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().slice(0, 10),
          value: 2000 + Math.floor(Math.random() * 150) + Math.floor(i / 30) * 30,
        })),
      },
    ],
  };
  res.json(data);
});

/**
 * @swagger
 * /api/mockModuleUsage:
 *   get:
 *     summary: Module usage breakdown (Inspect, Plan, Build)
 *     description: Returns mock usage counts and durations for core modules to support bar charts and heatmaps.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Module usage summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Inspect
 *                       usageCount:
 *                         type: number
 *                         example: 1245
 *                       avgSessionMinutes:
 *                         type: number
 *                         example: 14.2
 */
router.get('/api/mockModuleUsage', (req, res) => {
  res.json({
    modules: [
      { name: 'Inspect', usageCount: 1540, avgSessionMinutes: 12.4 },
      { name: 'Plan', usageCount: 980, avgSessionMinutes: 15.1 },
      { name: 'Build', usageCount: 1825, avgSessionMinutes: 18.6 },
    ],
  });
});

/**
 * @swagger
 * /api/mockFeatureAdoptionFunnel:
 *   get:
 *     summary: Feature adoption funnel data
 *     description: Returns mock funnel percentages and counts for feature discovery and adoption.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Funnel stages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stage:
 *                         type: string
 *                         example: Discovered
 *                       count:
 *                         type: number
 *                         example: 1000
 *                       percent:
 *                         type: number
 *                         example: 100
 */
router.get('/api/mockFeatureAdoptionFunnel', (req, res) => {
  const total = 1000;
  const discovered = total;
  const tried = 720;
  const activeWeekly = 520;
  const activeMonthly = 420;
  const champions = 120;
  res.json({
    stages: [
      { stage: 'Discovered', count: discovered, percent: 100 },
      { stage: 'Tried Once', count: tried, percent: Math.round((tried / total) * 100) },
      { stage: 'Active Weekly', count: activeWeekly, percent: Math.round((activeWeekly / total) * 100) },
      { stage: 'Active Monthly', count: activeMonthly, percent: Math.round((activeMonthly / total) * 100) },
      { stage: 'Champions', count: champions, percent: Math.round((champions / total) * 100) },
    ],
  });
});

/**
 * @swagger
 * /api/mockCostByUser:
 *   get:
 *     summary: Cost and credit usage per user
 *     description: Returns mock per-user costs and credits for chargeback views.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Per-user cost and credits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         example: u_101
 *                       name:
 *                         type: string
 *                         example: Jane Doe
 *                       team:
 *                         type: string
 *                         example: Platform
 *                       costUSD:
 *                         type: number
 *                         example: 42.31
 *                       creditsUsed:
 *                         type: number
 *                         example: 312
 *                       creditsRemaining:
 *                         type: number
 *                         example: 688
 */
router.get('/api/mockCostByUser', (req, res) => {
  res.json({
    users: [
      { userId: 'u_101', name: 'Jane Doe', team: 'Platform', costUSD: 42.31, creditsUsed: 312, creditsRemaining: 688 },
      { userId: 'u_102', name: 'John Smith', team: 'Platform', costUSD: 35.12, creditsUsed: 270, creditsRemaining: 730 },
      { userId: 'u_103', name: 'Alex Johnson', team: 'Payments', costUSD: 55.9, creditsUsed: 415, creditsRemaining: 585 },
      { userId: 'u_104', name: 'Priya Kumar', team: 'Analytics', costUSD: 29.5, creditsUsed: 201, creditsRemaining: 799 },
    ],
  });
});

/**
 * @swagger
 * /api/mockFeatureUsageByUser:
 *   get:
 *     summary: Feature usage intensity by user
 *     description: Returns mock user-feature usage counts and durations to power heatmaps and rankings.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Per-user feature usage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       team:
 *                         type: string
 *                       usage:
 *                         type: object
 *                         additionalProperties:
 *                           type: object
 *                           properties:
 *                             count:
 *                               type: number
 *                             minutes:
 *                               type: number
 */
router.get('/api/mockFeatureUsageByUser', (req, res) => {
  const features = ['Inspect', 'Plan', 'Build', 'Docs', 'Help'];
  const users = [
    { userId: 'u_101', name: 'Jane Doe', team: 'Platform' },
    { userId: 'u_102', name: 'John Smith', team: 'Platform' },
    { userId: 'u_103', name: 'Alex Johnson', team: 'Payments' },
    { userId: 'u_104', name: 'Priya Kumar', team: 'Analytics' },
  ];
  const usersWithUsage = users.map(u => ({
    ...u,
    usage: features.reduce((acc, f) => {
      acc[f] = {
        count: Math.floor(Math.random() * 50),
        minutes: +(5 + Math.random() * 30).toFixed(1),
      };
      return acc;
    }, {}),
  }));
  res.json({ features, users: usersWithUsage });
});

/**
 * @swagger
 * /api/mockUserProductivity:
 *   get:
 *     summary: User productivity metrics
 *     description: Returns mock per-user productivity metrics like task completion, acceptance ratio, and time saved.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Productivity metrics per user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       completionRate:
 *                         type: number
 *                       acceptanceRate:
 *                         type: number
 *                       timeSavedMinutes:
 *                         type: number
 */
router.get('/api/mockUserProductivity', (req, res) => {
  res.json({
    users: [
      { userId: 'u_101', name: 'Jane Doe', completionRate: 0.92, acceptanceRate: 0.76, timeSavedMinutes: 320 },
      { userId: 'u_102', name: 'John Smith', completionRate: 0.88, acceptanceRate: 0.71, timeSavedMinutes: 280 },
      { userId: 'u_103', name: 'Alex Johnson', completionRate: 0.81, acceptanceRate: 0.64, timeSavedMinutes: 190 },
      { userId: 'u_104', name: 'Priya Kumar', completionRate: 0.95, acceptanceRate: 0.82, timeSavedMinutes: 410 },
    ],
  });
});

/**
 * @swagger
 * /api/mockEffectiveness:
 *   get:
 *     summary: AI output effectiveness metrics
 *     description: Returns mock outcome ratios for accepted, edited, and discarded outputs and trend data.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Effectiveness summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                   properties:
 *                     accepted:
 *                       type: number
 *                     edited:
 *                       type: number
 *                     discarded:
 *                       type: number
 *                 trend:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       accepted:
 *                         type: number
 *                       edited:
 *                         type: number
 *                       discarded:
 *                         type: number
 */
router.get('/api/mockEffectiveness', (req, res) => {
  const base = { accepted: 540, edited: 310, discarded: 120 };
  const trend = Array.from({ length: 14 }).map((_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 3600 * 1000).toISOString().slice(0, 10),
    accepted: 20 + Math.floor(Math.random() * 20),
    edited: 10 + Math.floor(Math.random() * 15),
    discarded: 3 + Math.floor(Math.random() * 8),
  }));
  res.json({ summary: base, trend });
});

/**
 * @swagger
 * /api/mockLicenseUtilization:
 *   get:
 *     summary: License utilization metrics
 *     description: Returns mock active seats vs purchased seats and daily usage trend.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: License utilization snapshot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 purchasedSeats:
 *                   type: number
 *                 activeSeats:
 *                   type: number
 *                 utilization:
 *                   type: number
 *                 dailyActiveSeats:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       active:
 *                         type: number
 */
router.get('/api/mockLicenseUtilization', (req, res) => {
  const purchasedSeats = 200;
  const activeSeats = 148;
  const utilization = +(activeSeats / purchasedSeats).toFixed(2);
  const dailyActiveSeats = Array.from({ length: 14 }).map((_, i) => ({
    date: new Date(Date.now() - (13 - i) * 24 * 3600 * 1000).toISOString().slice(0, 10),
    active: 120 + Math.floor(Math.random() * 40),
  }));
  res.json({ purchasedSeats, activeSeats, utilization, dailyActiveSeats });
});

/**
 * @swagger
 * /api/mockSupportTrends:
 *   get:
 *     summary: Support usage trends
 *     description: Returns mock support ticket volumes and resolution times for trend analysis.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Support metrics over time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 series:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       metric:
 *                         type: string
 *                       points:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             date:
 *                               type: string
 *                             value:
 *                               type: number
 */
router.get('/api/mockSupportTrends', (req, res) => {
  const series = [
    {
      metric: 'ticketVolume',
      points: Array.from({ length: 30 }).map((_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().slice(0, 10),
        value: 5 + Math.floor(Math.random() * 12),
      })),
    },
    {
      metric: 'avgResolutionHours',
      points: Array.from({ length: 30 }).map((_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 3600 * 1000).toISOString().slice(0, 10),
        value: +(4 + Math.random() * 6).toFixed(1),
      })),
    },
  ];
  res.json({ series });
});

/**
 * @swagger
 * /api/mockTeamAdoptionSummary:
 *   get:
 *     summary: Team-level adoption summary
 *     description: Returns mock ranked teams by active users and usage intensity.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Team adoption ranking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       team:
 *                         type: string
 *                       activeUsers:
 *                         type: number
 *                       usageIntensity:
 *                         type: number
 */
router.get('/api/mockTeamAdoptionSummary', (req, res) => {
  res.json({
    teams: [
      { team: 'Platform', activeUsers: 42, usageIntensity: 0.86 },
      { team: 'Payments', activeUsers: 34, usageIntensity: 0.73 },
      { team: 'Analytics', activeUsers: 27, usageIntensity: 0.69 },
      { team: 'Security', activeUsers: 19, usageIntensity: 0.55 },
    ],
  });
});

/**
 * @swagger
 * /api/mockFeatureUsageByTeam:
 *   get:
 *     summary: Feature usage by team
 *     description: Returns mock feature usage counts segmented by team for stacked bar charts.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Team-feature usage matrix
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 features:
 *                   type: array
 *                   items:
 *                     type: string
 *                 teams:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       team:
 *                         type: string
 *                       usage:
 *                         type: object
 *                         additionalProperties:
 *                           type: number
 */
router.get('/api/mockFeatureUsageByTeam', (req, res) => {
  const features = ['Inspect', 'Plan', 'Build', 'Docs', 'Help'];
  const teams = ['Platform', 'Payments', 'Analytics', 'Security'];
  const data = teams.map(t => ({
    team: t,
    usage: features.reduce((acc, f) => {
      acc[f] = Math.floor(Math.random() * 400);
      return acc;
    }, {}),
  }));
  res.json({ features, teams: data });
});

/**
 * @swagger
 * /api/mockWorkflowDropoff:
 *   get:
 *     summary: Workflow drop-off analysis
 *     description: Returns mock funnel stages with completion and abandonment counts to identify friction points.
 *     tags: [Mock Data]
 *     responses:
 *       200:
 *         description: Workflow funnel dataset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stage:
 *                         type: string
 *                       completed:
 *                         type: number
 *                       abandoned:
 *                         type: number
 */
router.get('/api/mockWorkflowDropoff', (req, res) => {
  res.json({
    stages: [
      { stage: 'Start', completed: 1000, abandoned: 0 },
      { stage: 'Configure', completed: 820, abandoned: 180 },
      { stage: 'Run', completed: 640, abandoned: 180 },
      { stage: 'Review', completed: 520, abandoned: 120 },
      { stage: 'Finalize', completed: 420, abandoned: 100 },
    ],
  });
});

module.exports = router;
