const Question = require('../models/models').Question;
const Category = require('../models/models').Category;
exports.addQuestion = (req, res, next) => {

    Category.findAll()
        .then(categories => {
            //  console.log(categories);
            res.render('questions/addQuestion', {

                categories: categories,
                path: '/'


            });
        })
        .catch(err => {

            res.status(400).send({
                message: "Error in fetching all categories list",
                err: err
            });
        });



};



exports.postAddQuestion = async (req, res, next) => {

    console.log("Adding a new question");
    var categoryId = req.body.category;
    console.log("category id ", categoryId);
    var categoryTitle = req.body.categoryTitle;
    var newCategoryTitle = req.body.newCategory;

    if (categoryId == -2) {
        var category = await Category.findOne({ where: { title: newCategoryTitle } });
        if (category != null) {
            categoryId = category.id;
            categoryTitle = category.title;
        } else {

            categoryId = null;
            categoryTitle = newCategoryTitle;
        }


    } else if (categoryId == -1) {

        res.status(400).send({
            "message": "Failed to realise a category"
        });
    }

    if (categoryId == null) {
        var category = await Category.create({
            title: categoryTitle
        });

        categoryId = category.id;
    }

    var question = await Question.create({
        question: req.body.question,
        correctAnswer: req.body.correctAnswer,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        categoryTitle: categoryTitle,
        categoryId: categoryId,
        correctAnswerGuesses: 0,
        option1Guesses: 0,
        option2Guesses: 0,
        option3Guesses: 0
    });


    res.status(202).send(question);



};



exports.questions = (req, res, next) => {

    // MQuestion.find().then(result => {
    //     res.status(200).send(result);
    // })
    //     .catch(err => {
    //         res.status(400).send({
    //             message: "Error in getting all questions",
    //             err: err
    //         });
    //     })
    Question.findAll()
        .then(questions => {
            res.render('questions/questions', {

                questions: questions,
                path: '/'


            });
        })
        .catch(err => { console.log("Error in fetching all questions list. " + err) });

}

exports.categories = (req, res, next) => {

    // MQuestion.find().then(result => {
    //     res.status(200).send(result);
    // })
    //     .catch(err => {
    //         res.status(400).send({
    //             message: "Error in getting all questions",
    //             err: err
    //         });
    //     })
    Category.findAll()
        .then(categories => {
            res.render('categories/categories', {

                categories: categories,
                path: '/'


            });
        })
        .catch(err => { console.log("Error in fetching all categories list. " + err) });

}

exports.updateQuestion = async (req, res, next) => {

    try {
        var question = await Question.findByPk(req.params.id);

        res.render('questions/updateQuestion', {

            question: question,
            path: '/'


        });
    } catch (e) {

        res.send({
            message: "error in finding a question with provided id"
        })
    }


}

exports.postUpdateQuestion = (req, res, next) => {

    console.log("Updating the question ", req.params.id);

    var question = req.body.question;
    if (question == "undefined") {
        question = "";
    }
    var correctAnswer = req.body.correctAnswer;
    if (correctAnswer == "undefined") {
        correctAnswer = "";
    }
    var option1 = req.body.option1;
    if (option1 == "undefined") {
        option1 = "";
    }
    var option2 = req.body.option2;
    if (option2 == "undefined") {
        option2 = "";
    }
    var option3 = req.body.option3;
    if (option3 == "undefined") {
        option3 = "";
    }

    Question.update({

        question: question,
        correctAnswer: correctAnswer,
        option1: option1,
        option2: option2,
        option3: option3,




    }, { returning: true, where: { id: req.params.id } })
        .then(result => {
            console.log("Question updated");
            res.status(201).send({
                message: "Question updated successfully",
                status: 201
            });
        })
        .catch(err => {
            console.log("Error in updating question. " + err);
            res.status(400).send({
                message: "Failed to update question",
                error: err,
                status: 400
            });
        })

}
