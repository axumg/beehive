Observation = new Mongo.Collection('observation');

Router.route('/home', function () {
  this.render('form');
  this.layout('layout');      
  });

Router.route('/admin', function () {
  this.render('observation');
  this.layout('layout');
});

Router.route('/hive/:name', function () {
 this.render('hiveName', {
   data: function (){
     return {
      hiveName: Observation.find({name: this.params.name})
     }
   }
  });
  
    this.layout('layout');
  }, {
    name: 'hiveName.show'
  });

if (Meteor.isClient) {
 Meteor.subscribe("observation");

  Template.observation.helpers({
    'observation': function () {
      return Observation.find({}, {sort: {createdOn: -1}}) || {};
    },    
  });
  
  Template.form.events(
    {   //events takes an object, this is an object
      "submit form": function(event)
      {
        event.preventDefault();
                       
        var hiveNameBox = $(event.target).find('input[name=hiveName]');
        var hiveName = hiveNameBox.val();
        
        var observationDateBox = $(event.target).find('input[name=observationDate]');
        var observationDateText = observationDateBox.val();
        
        var miteCountBox = $(event.target).find('input[name=miteCount]');
        var miteCountText = miteCountBox.val();
        
        var durationBox = $(event.target).find('input[name=duration]');
        var durationText = durationBox.val();
        
        
        Observation.insert({
          observationDate: observationDateText,
          name: hiveName,
          miteCount: miteCountText,
          duration: durationText,
          createdOn: Date.now()
        });
        
        hiveNameBox.val('');
        observationDateBox.val('');
        miteCountBox.val('');
        durationBox.val('');
       }    
    }
  );
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
  
  Meteor.publish("observation", function (){
    return Observation.find();
  });
}
