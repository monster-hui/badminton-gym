/*模拟后台接口，仿真数据*/

var subscriptionData={
    A:[],
    B:[],
    C:[],
    D:[]
};
function api(){
  var self={};
  self.findSites=function(){
    var array=[];
     for(key in subscriptionData){
       array.push(key);
     }
     return {errCode:0,data:array};
  }

  self.findSubscriptionsBySite=function(site){
   var  subArray= subscriptionData[site];
    if(subArray){
      return {errCode:0,data:subArray};
    }
    return {errCode:3047,msg:'not find'};
  };

  self.isExistBookInTime=function (subscription) {
    var subArray= subscriptionData[subscription.site];
    if(!subArray){
      return {errCode:3047,msg:'not find'};
    }
    var isExist=false;
    for(var i=0;i<subArray.length;i++){
      if(subArray[i].date===subscription.date && !subArray[i].cancel){
          if(subscription.start>=subArray[i].start&&subscription.start<subArray[i].end){
            isExist=true;
            break;
          }
          if(subscription.end>subArray[i].start&&subscription.end<=subArray[i].end){
            isExist=true;
            break;
          }
          if(subscription.start<=subArray[i].start&&subscription.end>=subArray[i].end){
            isExist=true;
            break;
          }
      }
    };
    return {errCode:0,data:isExist};
  };

  self.cancelSubscription=function (subscription) {
   var subArray= subscriptionData[subscription.site];
    if(!subArray){
      return {errCode:3047,msg:'not find'};
    }
    for(var i=0;i<subArray.length;i++){
      if(subArray[i].userId===subscription.userId
              && subArray[i].date===subscription.date
              &&subArray[i].end===subscription.end
              &&subArray[i].start===subscription.start
              &&subArray[i].cancel===false){
        subArray[i].cancel=true;
        return {errCode:0,msg:"success"};
      }
    }
    return {errCode:3047,msg:'not find'};
  }

  self.postSubscription=function (subscription) {
    if(!subscription.site){
      return {errCode:3046,msg:'vaild input'};
    }
    var subArray= subscriptionData[subscription.site];
      subArray.push(subscription);
    return {errCode:0,data:true};
  }
return self;
}
module.exports=api;