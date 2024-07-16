const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello 9ino6ano!!!!')
});

app.get('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);
    
    if (result.error){
        //400 bad response result
        //$res.status(400).send('Name is required and should be a minimum of 3 characters long')
        res.status(400).send(error.details[0].message);
        return;
    };
    //$return; 
    //@res.send(courses);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
    
};

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    //if true validate to check theres not error
    //if not return error message
    //const result = Joi.validateCourse(req.body);
    const { error } = validateCourse(req.body);
    //result.error
    if (error){
        return res.status(400).send(error.details[0].message);
    };
    //update course and return course to client
    course.name = req.body.name;
    res.send(course);

});
// we can have a function that can be called whenever its need by different requests


//
app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given ID was not found') //404 
    res.send(course);
});
/*The route parameters
app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.params);
});
 The query parameters
 app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.query);
});
*/
//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}._._`));



//app.post()
//app.put()
//app.delete()
app.delete('/api/courses/:id', (req, res) =>{
    //look up the course
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found');
    //Delete
    const index = courses.indexOf(course);
    courses.splice(index,1);
    //return the same course
    res.send(courses);
});