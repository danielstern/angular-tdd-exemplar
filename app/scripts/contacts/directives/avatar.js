angular.module('AddressBook.Contacts')
.directive("avatar",function(){
	return {
		restrict:"AE",
		scope:{
			name:"=",
		},
		template:"<span class=avatar style='border:1px solid purple'>{{name[0] || '?'}}</span>"
	}
})
