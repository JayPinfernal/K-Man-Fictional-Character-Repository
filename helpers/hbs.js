const moment = require('moment');

module.exports =  {
  truncate: function(str,len) {
    if (str.length > len && str.length > 0) {
			var new_str = str + " ";
			new_str = str.substr(0, len);
			new_str = str.substr(0, new_str.lastIndexOf(" "));
			new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
			return new_str + '...';
		}
		return str;
  },
  stripTags: function(input){
   return input.replace(/<(?:.|\n)*?>/gm, '');
 },
 formatDate: function(date, format){
   return moment(date).format(format);
 },
 editIcon: function(entryUser,loggedUser,entryId,floating=true){
   if(entryUser == loggedUser){
     if(floating){
       return `<a href="/entries/edit/${entryId}" class="btn-floating halfway-fab blue"><i class="fa fa-pencil" aria-hidden="true"> </i></a>`;
     }else{
         return `<a href="/entries/edit/${entryId}" class="btn"><i class="fa fa-pencil" aria-hidden="true"> </i>Edit</a>`;
     }
   }else{
  return '';
   }

 }
};
