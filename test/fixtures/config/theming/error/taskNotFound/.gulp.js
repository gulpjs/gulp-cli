module.exports = {
  log: {
    msgs: {
      error: {
        taskNotFound: '{TIMESTAMP}TASK IS NOT FOUND: {TaskName:{1}}{IF:{2}? SIMILAR {SimilarTasks:{3}}}',
      },
    },
    theme: {
      TaskName: '**{1}**',
      SimilarTasks: '##{1}##',
    },
  },
};
