export const percentageToSeekVideoTo = (pageClickXPos, progressBar) => {
  const progressBarLeftPadding = parseInt(
    getComputedStyle(progressBar).paddingLeft.replace(/px/, '')
  );

  const progressBarLeftViewportOffset = (
    progressBar.getBoundingClientRect().left + progressBarLeftPadding
  );

  const clickPosInProgressBar = pageClickXPos - progressBarLeftViewportOffset;
  
  const videoTimePosPercentage = (
    (clickPosInProgressBar / progressBar.offsetWidth) * 100
  );

  return videoTimePosPercentage;
}
