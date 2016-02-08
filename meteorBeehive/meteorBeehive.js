Observation = new Mongo.Collection('observation');

Router.route('/', function () {
  this.render('observation'); //render guestbook template
  this.layout('layout');    //set the main Layout template  
  });

Router.route('/about', function () {
  this.render('about');
  this.layout('layout');
});

Router.route('/hiveName/:_id', function () {
 this.render('hiveName', {
   data: function (){
     return Observation.findOne({_id: this.params._id});
   }
  });
  
    this.layout('layout');
  }, {
    hiveName: 'hiveName.show'
  });

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.observation.helpers({
    counter: function () {
      return Session.get('counter');
    },
    
    observation: function () {
      return Observation.find({}).fetch();
    }   
    
  });

  Template.observation.events(
    {   //events takes an object, this is an object
      "submit form": function(event)
      {
        event.preventDefault();
        //alert('You clicked submit!');
                
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
    // code to run on server at startup
  });
  
  Meteor.publish("observation", function (){
    return Observation.find();
  });
}
