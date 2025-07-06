module.exports = {
  apps: [{
    name: 'mulimachibuye.com',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/mulimachibuye.com',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/www/mulimachibuye.com/logs/err.log',
    out_file: '/var/www/mulimachibuye.com/logs/out.log',
    log_file: '/var/www/mulimachibuye.com/logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    restart_delay: 4000,
    watch: false,
    ignore_watch: ['node_modules', 'logs', '.next'],
    autorestart: true,
    kill_timeout: 5000
  }]
};
