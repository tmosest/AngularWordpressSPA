var wpApp = angular.module('wpAngularTheme', ['ui.router', 'ngResource']);

wpApp.factory('Posts', ['$resource', function($resource) {
    return $resource('http://localhost:8888/wordpress2/wp-json/wp/v2/posts/:ID', {
        ID: '@id'
    });
}]);

wpApp.controller('ListController', ['$scope', 'Posts', function($scope, Posts) {
    console.log('ListController loaded!');
    $scope.page_title = 'Blog Listing';
    Posts.query(function(res){
        $scope.posts = res;
    });
}]);

wpApp.controller('DetailController', ['$scope', '$stateParams', 'Posts', 
    function($scope, $stateParams, Posts) {
        console.log('DetailController loaded!');
        $scope.page_title = 'Blog Listing';
        Posts.get({ ID: $stateParams.id }, function(res){
            $scope.post = res;
        });
    }
]);

wpApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('list', {
            url: '/',
            controller: 'ListController',
            controllerAs: 'ListCtrl',
            templateUrl: appInfo.template_directory + 'assets/templates/list.html'
        })
        .state('detail', {
            url: '/post/:id',
            controller: 'DetailController',
            templateUrl: appInfo.template_directory + 'assets/templates/details.html'
        });
});

wpApp.filter( 'to_trusted', ['$sce', function( $sce ){
	return function( text ) {
		return $sce.trustAsHtml( text );
	}
}])