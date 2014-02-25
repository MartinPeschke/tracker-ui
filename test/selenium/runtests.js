var chai        = require('chai'),
    assert      = chai.assert,
    expect      = chai.expect,
    webdriverjs = require('webdriverjs'),
    uuid = require('node-uuid');

describe('TrackerUI Sihnyup Workflow Tests', function(){

    this.timeout(99999999);
    var client = {};

    before(function(){
        client = webdriverjs.remote({ desiredCapabilities: {browserName: 'chrome'} });
        client.init();

        client.addCommand("getCurrentUrl", function(cb) {
            this.url(function(err,urlResult) {
                cb(err,urlResult.value);
            });
        });
    });
    it('Cannot go to Signup/Accounts without Signup first',function(done) {
        client
            .url('http://localhost:3000/#!/signup/account')
            .getCurrentUrl(function(err, url){
                assert.match(url, /signup$/)
            })
            .call(done);
    });
    it('Cannot go to Signup/Events without Signup first',function(done) {
        client
            .url('http://localhost:3000/#!/signup/events')
            .getCurrentUrl(function(err, url){
                assert.match(url, /signup$/)
            })
            .call(done);
    });
    it('Cannot go to Signup/mastercode without Signup first',function(done) {
        client
            .url('http://localhost:3000/#!/signup/mastercode')
            .getCurrentUrl(function(err, url){
                assert.match(url, /signup$/)
            })
            .call(done);
    });
    it('Cannot go to Signup/codes without Signup first',function(done) {
        client
            .url('http://localhost:3000/#!/signup/codes')
            .getCurrentUrl(function(err, url){
                assert.match(url, /signup$/)
            })
            .call(done);
    });

    function doSignup(client, emailAddr) {
        client
            .url('http://localhost:3000')
            .click('a[ui-sref="signup.start"]', function(err,res) {
                expect(err).to.be.null;
            })
            .getText('.workflow-step.ng-scope.active', function(err,text) {
                expect(err).to.be.null;
                assert.include(text, 'Sign Up');
            })
            .setValue('#company_name', 'Escapado Corp')
            .setValue('#user_name', 'Joe Excapado')
            .setValue('#user_email', emailAddr)
            .setValue('#password', 'maropa2M')
            .submitForm('.form-validated.form-box', function(err){
                expect(err).to.be.null;
            })
            .waitFor(".list-selector.list-selectable .item", 5000);
        return client;
    }

    it('after signup, cannot access codes page need create account first',function(done) {
        doSignup(client, 'test-'+uuid.v4()+'@friendfund.com')
            .url('http://localhost:3000/#!/signup/codes')
            .getCurrentUrl(function(err, url){
                console.log(url);
                assert.match(url, /signup$/)
            })
            .click("a=Signout")
            .call(done);
    });

    it('navigates through signup',function(done) {
        doSignup(client, 'test-'+uuid.v4()+'@friendfund.com')
            .setValue('#account_name', 'Account '+uuid.v4())
            .click('.list-selector.list-selectable .item:first-child')
            .getText('.list-selector.list-removeable .item', function(err, text){
                expect(err).to.be.null;
            })
            .getText('.workflow-step.ng-scope.active', function(err,text) {
                expect(err).to.be.null;
                assert.include(text, 'Create Account');
            })
            .call(done);
    });

    after(function(done) {
        client.end(done);
    });
});