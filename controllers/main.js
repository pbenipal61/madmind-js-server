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



exports.postAddQuestion = (req, res, next) => {

    console.log("Adding a new question");
    var categoryId = req.body.category;
    console.log("category id ", categoryId);
    var categoryTitle = req.body.categoryTitle;
    var newCategoryTitle = req.body.newCategory;

    Category.findOne({ where: { title: newCategoryTitle } }).then(category => {

        if (category != null) {

            categoryId = category["id"];
        }

        var categoryStatus = req.body.categoryStatus;
        var question = req.body.question;
        var correctAnswer = req.body.correctAnswer;

        var options = [];
        var option1 = req.body.option1;
        if (option1 != null && option1 != "") {
            options.push(option1);
        }
        var option2 = req.body.option2;
        if (option2 != null && option2 != "") {
            options.push(option2);
        }
        var option3 = req.body.option3;
        if (option3 != null && option3 != "") {
            options.push(option3);
        }


        var usePermission = 0;
        console.log(
            "options length is ", options.length
        );
        if ((options.length >= 3) && (question != null && question != "") && (correctAnswer != null && correctAnswer != "")) {
            console.log("changing use permission");
            usePermission = 1;
        }


        console.log(categoryId, question, correctAnswer, categoryTitle);

        if (question != null && correctAnswer != null && option1 != null && option2 != null && option3 != null) {
            if (categoryId != -1 && categoryId != -2) {


                Question.create({
                    question: question,
                    categoryId: categoryId,
                    categoryTitle: categoryTitle,
                    correctAnswer: correctAnswer,
                    option1: option1,
                    option2: option2,
                    option3: option3,

                    option1Guesses: 0,
                    option2Guesses: 0,
                    option3Guesses: 0,


                    usePermission: usePermission

                }).then(result => {
                    console.log("Question added");


                    res.status(201).send({
                        message: "Question added successfully",
                        status: 201,
                        result: result
                    });
                })
                    .catch(err => {
                        console.log("Error in adding question. " + err);
                        res.status(400).send({
                            message: "Failed to add question",
                            error: err,
                            status: 400
                        });
                    });




            } else {


                if (categoryId == -1) {

                    console.log("Failed to realise a category for the question");
                    res.status(400).send({
                        message: "Failed to realise a category for the question",
                        status: 400
                    });

                } else {

                    Category.create({
                        title: newCategoryTitle,
                        status: categoryStatus,

                    })
                        .then(result => {
                            categoryId = result["dataValues"].id;
                            Question.create({
                                question: question,
                                categoryId: categoryId,
                                categoryTitle: result["dataValues"].title,
                                correctAnswer: correctAnswer,
                                option1: option1,
                                option2: option2,
                                option3: option3,

                                option1Guesses: 0,
                                option2Guesses: 0,
                                option3Guesses: 0,


                                usePermission: usePermission

                            }).then(result2 => {
                                console.log("Question added to the new category successfully");
                                res.status(201).send({
                                    message: "Question added to the new category successfully",
                                    status: 201,
                                    result: result2
                                });
                            }).catch(err => {
                                console.log("Error in adding question. " + err);
                                res.status(400).send({
                                    message: "Failed to add question to the new category",
                                    error: err,
                                    status: 400
                                });
                            });
                        })
                        .catch(err => {
                            console.log("Error in adding new category. " + err);

                            res.status(400).send({
                                message: "Failed to add new category",
                                error: err,
                                status: 400
                            });
                        });

                }



            }
        }





    });





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