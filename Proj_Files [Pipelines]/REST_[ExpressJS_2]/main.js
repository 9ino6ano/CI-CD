const Joi = require('joi'); //returns a class [Pascal naming case]
const express = require('express'); //1 > load the express module and name it (express) => returns a function
const app = express(); // 2 > call the function, as object of express = this will represent the application
//Inc HTTP Methods as call back functions => app.get() app.post()   app.put()   app.delete()
//13 > feature for enabling json objects on express => creating middleware
//when sending requests, we call express middleware to be used by the application
app.use(express.json());

//11 > creating an array to save our list of courses
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

//3 > Using the call back fuctions
//4 > Specify Path (/) & Route/Call-back fuction (req, res) => {...}
app.get('/', (req, res) => {
    res.send('Welcome to 9ino6ano!!!!')
});

//5 This function will listen on a given port, specify which port to use
//6 Define a function that will be called once the app starts listening on a given port
//7 > create a get request that will return a collection
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
//9 >Handling GET requests
//10 > calling a specific customer req. function
//11 > handling post requests = to create a new course
app.post('/api/courses', (req, res) => {
    //with joi first you have to define a schema
    const { error } = validateCourse(req.body);// this is equivalent to result.error
    if (error) return  res.status(400).send(error.details[0].message);// if req doesnt exist or if name is less than 3 => 404 bad request
              // this is the new way of validating a course
    const course = { //because you not working with a database you have to assign attributes manually
        id: courses.length + 1,
        name: req.body.name //you have to enable a feature to pass json objects, by default its not enabled
        //What happens if the client forgets to include the name in body of the req, or inputs an invalid name
        //15.Input validation
    }
    courses.push(course);//push the new course to the array
    res.send(courses);//after creating the new id on the server, send back the id to the client in the respond body
});
//handling put requests -> used when you want to update a file
app.put('/api/courses/:id', (req, res) => {
    //look up the course, if course doesnt exist return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));//if asked for a resource and doesnt exist on the server send = 404
    if (!course) return res.status(404).send('The course with the given ID was not found');
    //else validate the course to check if its in good shape | return bad request
    //16 -> we have all our validate logic in one place, define a constant and save the logic
    const { error } = validateCourse(req.body);// this is equivalent to result.error
    if (error) return res.status(400).send(error.details[0].message);// if req doesnt exist or if name is less than 3 => 404 bad request
        // this is the new way of validating a course
    //update and return course to the client
    course.name = req.body.name;
    res.send(course);
});
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()//if we were dealing with complex objects with alot of properties , then the validate funciton would be duplicated.
    };
    //const result = schema.validate(course, schema);
    const result = schema.validate(course);
    return Joi.validate(course, schema);
}
//handling delete requests
app.delete('/api/courses/:id', (req, res) =>{
    //look up the course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    //return the same course
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));//if asked for a resource and doesnt exist on the server send = 404
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

const port = process.env.PORT || 4000;//8 > for deploying on hosting env, we need [env.var = PORT] because they are dynamically assigned based on port 
app.listen(port, () => console.log(`Listening on port ${port}..:..:_`));

