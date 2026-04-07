import React from 'react';
import { MAIN_COLOR } from 'src/utils/const';
import { formatPace, titleForRun, formatRunTime  } from 'src/utils/utils';
import styles from './style.module.scss';

const getAvgHeartRate = (allRuns, currentRunDate) => {
  if (!allRuns || allRuns.length === 0) return null;
  
  const currentDate = new Date(currentRunDate);
  const thirtyDaysAgo = new Date(currentDate);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentRunsWithHR = allRuns.filter(run => {
    if (!run.average_heartrate) return false;
    const runDate = new Date(run.start_date_local);
    return runDate >= thirtyDaysAgo && runDate <= currentDate;
  });
  
  if (recentRunsWithHR.length === 0) return null;
  
  const sum = recentRunsWithHR.reduce((acc, run) => acc + run.average_heartrate, 0);
  return sum / recentRunsWithHR.length;
};

const RunRow = ({ runs, allRuns, run, locateActivity, runIndex, setRunIndex }) => {
  const distance = (run.distance / 1000.0).toFixed(1);
  const pace = run.average_speed;

  const paceParts = pace ? formatPace(pace) : null;

  const heartRate = run.average_heartrate || getAvgHeartRate(allRuns, run.start_date_local);

  const runTime = formatRunTime(distance,pace);

  const handleClick = (e, runs, run) => {
    const elementIndex = runs.indexOf(run);
    e.target.parentElement.style.color = 'red';

    const elements = document.getElementsByClassName(styles.runRow);
    if (runIndex !== -1 && elementIndex !== runIndex) {
      elements[runIndex].style.color = MAIN_COLOR;
    }
    setRunIndex(elementIndex);
  };

  return (
    <tr
      className={styles.runRow}
      key={run.start_date_local}
      onClick={(e) => {
        handleClick(e, runs, run);
        locateActivity(run);
      }}
    >
      <td>{titleForRun(run)}</td>
      <td>{distance}</td>
      {pace && <td>{paceParts}</td>}
      <td>{heartRate ? heartRate.toFixed(0) : ''}</td>
      <td>{runTime}</td>
      <td className={styles.runDate}>{run.start_date_local}</td>
    </tr>
  );
};

export default RunRow;
