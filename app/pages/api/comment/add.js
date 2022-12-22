const connector = require('../../../database/dbConnector');

async function addComment(params) {
    const conn = new connector();
  
    const sql = `INSERT INTO netskope.comments (Name, Comment, mId) VALUES ('${params.Name}', '${params.Comment}', ${params.mId});`;
    // console.log("sql", sql, params);
    const result = await conn.execute(sql);
    return result;
}

export default async function handler(req, res) {
    const result = await addComment(req.body);
    res.status(200).json(result);
}