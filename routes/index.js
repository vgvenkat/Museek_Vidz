
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Museek VidZ',sub_title:'A project built with Node/Express/Jade' });
};