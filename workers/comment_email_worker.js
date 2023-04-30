// const { Queue } = require('kue');
// const queue = require('../config/kue');

// const commentsMailer = require('../mailers/comments_mailer');

// Queue.process('emails', function(job, done){
//     console.log('email works are processing a job', job.data);
//     commentsMailer.newComment(job.data);
//     done();
// })