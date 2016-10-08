var wpApp = angular.module('wpAngularTheme', ['ui.router', 'ngResource']);

wpApp.factory('Posts', ['$resource', function($resource) {
    return $resource(appInfo.api_url + 'posts:ID', {
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
