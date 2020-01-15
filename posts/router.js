const router = require('express').Router();

const Posts = require('../data/db');

// POST
router.post('/', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    Posts.insert({title, contents})
        .then(post => {
            Posts.findById(post.id)
                .then(post => {
                    res.status(201).json(post)
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({})
        });
});

// GET
router.get('/', (req, res) => {
    Posts.find()
    .then(posts =>{
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." })
    });
});

//GET BY ID
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." })
    });
});

//DELETE
router.delete('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post.length === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." }); 
        } else {
            Posts.remove(req.params.id)
            .then(() => {
                res.status(200).json({ message: "Post deleted."})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "The post could not be removed" })
            });
        };
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post could not be removed" })
    });
});

//PUT
router.put('/:id', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    Posts.findById(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            Posts.update(req.params.id, { title, contents})
            .then(updated => {
                if (updated === 1){
                    Posts.findById(req.params.id)
                    .then(post => {
                        res.status(200).json(post)
                    });
                };
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ error: "The post information could not be modified." })
            });
        };
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post information could not be modified." })
    });
});

//POST COMMENTS
router.post('/:id/comments', (req, res) => {
    
    const { id } = req.params;
    let comment = req.body;
    comment = { ...comment, post_id: id}

    if (!comment.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    Posts.insertComment(comment)
    .then(_comment => {
        res.status(201).json(_comment.id)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    });
});

// GET COMMENTS
router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(comments =>{
        if (comments.length === 0){
            res.status(404).json({ message: "There are no comments for this post."})
        } else {
            res.status(200).json(comments);
        } 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The comments information could not be retrieved." })
    });
});

// GET COMMENT BY ID
router.get('/comments/:comment_id', (req, res) => {
    
    Posts.findCommentById(req.params.comment_id)
    .then(comment => {
        if (comment.length === 0){
            res.status(404).json({ message: "There is no comment associated with that ID"})
        }else{
            res.status(200).json(comment)
        };
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." });
    });
});

module.exports = router;