export const Users = {
  standard: { username: 'standard_user', password: 'secret_sauce', description: 'Standard User' },
  locked: { username: 'locked_out_user', password: 'secret_sauce', description: 'Locked Out User' },
  problem: { username: 'problem_user', password: 'secret_sauce', description: 'Problem User' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce', description: 'Performance Glitch User' },
  error: { username: 'error_user', password: 'secret_sauce', description: 'Error User' },
  visual: { username: 'visual_user', password: 'secret_sauce', description: 'Visual User' },
} as const;