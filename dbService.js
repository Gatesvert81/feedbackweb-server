const mysql = require('mysql')
const bcrypt = require('bcrypt')
let instance = null

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'Mathias$19981',
    database: 'feedback_db'
})

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService
    }

    async signUp(email, password) {
        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds).then(function (hash) {
                // Store hash in your password DB
                return hash
            });
            console.log(hashedPassword)
            const result = await new Promise((resolve, reject) => {
                const query = "INSERT INTO users ( email, password ) VALUES ( ? , ? )"
                connection.query(query, [email, hashedPassword], (error, results) => {
                    if (error) {
                        reject(new Error(error.message))
                    }
                    resolve(results)
                })
            })
            return {
                success: true,
                result
            }
        } catch (error) {

            console.log( " sign Up db" , error.message)
            return {
                success: false
            }
        }
    }

    async signIn(email, password) {
        try {
            const user = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE email = ? "
                connection.query(query, [email, password], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })
            if (email === user[0].email) {
                const isPassword = await bcrypt.compare(password, user[0].password).then(function (result) {
                    return result
                });
                if (isPassword) {
                    const reqUser = {
                        id : user[0].id ,
                        email : user[0].email,
                        password : user[0].password
                    }
                    console.log(isPassword,reqUser)
                    return reqUser
                } else {
                    console.log(isPassword)
                    return {
                        message: "Incorrect password"
                    }
                }
            } else {
                return {
                    message: "User not found"
                }
            }
        } catch (error) {

        }
    }

    async getLastId() {
        try {
            const id = await new Promise((resolve, reject) => {
                const query = "SELECT MAX(feedback_id) AS id FROM feedbacks"
                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })
            return id[0].id
        } catch (error) {
            if (error) throw error
        }
    }



    async addFeedback(head, body, tags) {
        try {
            const lastId = await this.getLastId()
            console.log(lastId)
            const feedback = await new Promise((resolve, reject) => {
                const insertFeedbackQuery = "INSERT INTO feedbacks (feedback_head, feedback_body) VALUES (?,?)"
                connection.query(insertFeedbackQuery, [head, body], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
                const insertTagQuery = "INSERT INTO tags (tag, feeds_id) VALUES (?,?)"
                connection.query(insertTagQuery, [tags, lastId + 1], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })
            return {
                success: true,
                feedback: feedback
            }
        } catch (error) {
            if (error) throw error        }
    }

    async getFeedbacks() {
        try {
            return await new Promise((resolve, reject) => {
                const query = "SELECT * from feedbacks AS f JOIN tags AS t WHERE t.feeds_id = f.feedback_id"
                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })
             
        } catch (error) {
            if (error) throw error
        }
    }

    async feedback(id) {
        try {
            const feedback = await new Promise((resolve, reject) => {
                const feedbackQuery = "SELECT * from feedbacks AS f RIGHT JOIN tags AS t ON t.feeds_id = f.feedback_id WHERE feedback_id = ?"
                connection.query(feedbackQuery, [id], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })

            })
            const comments = await new Promise((resolve, reject) => {
                const commentQuery = "SELECT * FROM comments AS c WHERE c.feedback_id = ?"
                connection.query(commentQuery, [id], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })
            return {
                feedback: feedback,
                comments: comments
            }
        } catch (error) {
            if (error) throw error
        }
    }

    async addComment(body, id) {
        try {
            const comment = await new Promise((resolve, reject) => {
                const query = "INSERT INTO comments (comment_body, feedback_id) VALUES (?,?)"
                connection.query(query, [body, id], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })
            return {
                success: true,
                comment: comment
            }
        } catch (error) {
            if (error) throw error
        }
    }

    async editFeedback(head, body, tags, id) {
        try {
            const feedback = await new Promise((resolve, reject) => {
                const commentQuery = "UPDATE feedbacks SET feedback_head=? , feedback_body=? WHERE feedback_id = ?"
                connection.query(commentQuery, [head, body, id], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
                const tagQuery = "UPDATE tags SET tag=? WHERE feeds_id = ?"
                connection.query(tagQuery, [tags, id], (err, results) => {
                    if (err) {
                        reject(new Error(err.message))
                    }
                    resolve(results)
                })
            })
            return {
                success: true,
                feedback: feedback
            }
        } catch (error) {
            if (error) throw error
        }
    }

}

module.exports = DbService