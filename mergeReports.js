const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'cypress', 'reports');
const outputFile = path.join(reportsDir, 'report.json');

function mergeReports() {
  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json') && !f.startsWith('report'));
  
  let merged = {
    stats: {
      suites: 0,
      tests: 0,
      passes: 0,
      pending: 0,
      failures: 0,
      start: null,
      end: null,
      duration: 0,
      testsRegistered: 0,
      passPercent: 0,
      pendingPercent: 0,
      other: 0,
      hasOther: false,
      skipped: 0,
      hasSkipped: false
    },
    results: [],
    meta: null
  };

  files.forEach(file => {
    const report = JSON.parse(fs.readFileSync(path.join(reportsDir, file), 'utf8'));
    
    // Merge stats
    merged.stats.suites += report.stats.suites;
    merged.stats.tests += report.stats.tests;
    merged.stats.passes += report.stats.passes;
    merged.stats.pending += report.stats.pending;
    merged.stats.failures += report.stats.failures;
    merged.stats.duration += report.stats.duration;
    merged.stats.testsRegistered += report.stats.testsRegistered;
    merged.stats.skipped += report.stats.skipped;

    // Adjust start and end
    const startDate = new Date(report.stats.start);
    const endDate = new Date(report.stats.end);
    if (!merged.stats.start || startDate < new Date(merged.stats.start)) {
      merged.stats.start = report.stats.start;
    }
    if (!merged.stats.end || endDate > new Date(merged.stats.end)) {
      merged.stats.end = report.stats.end;
    }

    // Merge results array
    merged.results = merged.results.concat(report.results);

    // Save meta from first report
    if (!merged.meta) {
      merged.meta = report.meta;
    }
  });

  // Calculate passPercent and pendingPercent
  merged.stats.passPercent = (merged.stats.passes / merged.stats.tests) * 100 || 0;
  merged.stats.pendingPercent = (merged.stats.pending / merged.stats.tests) * 100 || 0;

  fs.writeFileSync(outputFile, JSON.stringify(merged, null, 2));
  console.log(`Merged report generated at ${outputFile}`);
}

mergeReports();
