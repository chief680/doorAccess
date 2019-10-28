/*
max score of the course, name of the course, and name of the students who has max score in that
course, for each course.

1. From the enrollment table, we calculate the max score for each course:
cid, maxscore

2. We then join the data with the enrollment table again to pick up the sid:
cid, sid, maxscore

3 Then we join the student and course tables to pick up the student name and course name
*/
with tblScore as (
select e1.cid, e1.sid, maxScore
from enrollment as e1
join
	(
		select cid, max(score) as maxScore
		from enrollment
		group by cid
	) as e2
	on e1.cid = e2.cid and e1.score = e2.maxScore
)
select course.name, student.name, maxScore from tblScore 
join course on course.cid = tblScore.cid
join student on student.sid = tblScore.sid
order by course.name


/*
max score of the student, name of the student, name of the courses in which the student has max score,
for each student.

1. From the enrollment table, we calculate the max score for each student:
sid, maxscore

2. We then join the data with the enrollment table again to pick up the cid:
sid, cid, maxscore

3 Then we join the student and course tables to pick up the student name and course name
*/
with tblScore as (
select e1.sid, e1.cid, maxScore
from enrollment as e1
join  
	(
		select sid, max(score) as maxScore
		from enrollment
		group by sid
	) as e2
	on e1.sid = e2.sid and e1.score = e2.maxScore
)
select student.name, course.name, maxScore from tblScore 
join student on student.sid = tblScore.sid
join course on course.cid = tblScore.cid
order by student.name


create table access_code (
id integer,
access_code char(32)
);
