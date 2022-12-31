<?php



class dbcon{
    static public function conn() {
        try{
            $db = new PDO('mysql:host=localhost;dbname=quiz','root','');
            $db ->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE , PDO::FETCH_ASSOC);
            return $db;
        }
        catch (PDOException $e){
            print "err". $e ->getMessage();
            die();
        }
    }

    static public function getdata(){
        $sql = 'SELECT q.content,q.exp,MIN(CASE WHEN r.question_id = q.id and r.iscorrect = 1 THEN r.content END) AS correct_ans,
        MIN(CASE WHEN r.id = (q.id*4)-3 THEN r.content END) AS answer_1,MAX(CASE WHEN r.id = (q.id*4)-3 THEN r.iscorrect END) AS iscorrect1,
        MAX(CASE WHEN r.id = (q.id*4)-2 THEN r.content END) AS answer_2,MAX(CASE WHEN r.id = (q.id*4)-2 THEN r.iscorrect END) AS iscorrect2,
        MIN(CASE WHEN r.id = (q.id*4)-1 THEN r.content END) AS answer_3,MAX(CASE WHEN r.id = (q.id*4)-1 THEN r.iscorrect END) AS iscorrect3,
        MAX(CASE WHEN r.id = (q.id*4) THEN r.content END) AS answer_4,MAX(CASE WHEN r.id = (q.id*4) THEN r.iscorrect END) AS iscorrect4
        FROM questions q
        JOIN responses r  GROUP by q.id ORDER by q.id;';
        $exe = self::conn() -> prepare($sql);
        $exe ->execute();
        $res = $exe->fetchAll();
        return $res;
    }

}
echo json_encode(dbcon::getdata());