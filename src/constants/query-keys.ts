export const QUERY_KEYS = {
  GET: {
    IN_PROGRESS_CLOCKS: () => ['in-progress-clocks'],
    DONE_CLOCKS: () => ['done-clocks'],
    CURRENT_USER_CLOCK_IN_PROGRESS: () => ['current-user-clock-in-progress'],
    USERS: () => ['users'],
  },
  MUTATE: {
    CURRENT_USER_CLOCK_IN_PROGRESS: () => ['current-user-clock-in-progress', 'in-progress-clocks'],
  }
}
