angular.module('AddressBook.Contacts')
.directive("avatar",function(){
	return {
		restrict:"AE",
		scope:{
			name:"=",
		},
		template:"<span class=avatar>{{name[0] || '?' | proper}}</span>"
	}
})
