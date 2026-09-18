
TRUNCATE TABLE events CASCADE;
TRUNCATE TABLE event_rules CASCADE;
TRUNCATE TABLE judging_criteria CASCADE;
TRUNCATE TABLE event_coordinators CASCADE;

INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(1,'bridgemania','EVT-01','Bridgemania','From Sticks to Strength','building','structural','Structural Engineering','2-3 Members',true,2,3,'7 Hours','₹7,000','On-spot bridge-making competition where participants design and construct a bridge model using permitted materials that can bear the maximum possible load. Tests structural creativity, engineering judgment, and load-bearing efficiency.','Civil Lab 1 (Block B)','Oct 9, 2026','10:00 AM','#06b6d4','/images/events/bridgemania.png','Published',1);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(1,'Model built on event days only - 4 hours on day 1, 3 hours on day 2',1),
(1,'Ice cream sticks/popsicle sticks and bamboo skewers (primary structural material) - provided',2),
(1,'Anabond glue only - provided on the spot',3),
(1,'Participants must bring their own scale',4),
(1,'No metal wires, tapes, thermocol, M-seals, or threads permitted',5),
(1,'Bridge must span a minimum clear span of 500mm to 800mm between two supports',6),
(1,'Total model width must not exceed 150 mm',7),
(1,'Bridge deck (load surface) must be flat and level',8);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(1,'Strength-to-Weight Ratio','Primary criterion — maximum load divided by self-weight of the model',50,1),
(1,'Construction Quality','Neatness, joint quality, and structural integrity',20,2),
(1,'Creativity & Design','Aesthetic appeal and innovative structural form',15,3),
(1,'Presentation','Team''s ability to explain design choices and respond to questions if asked',15,4);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(1,'Mr. M. Anirudh','','Faculty Advisor',1),
(1,'V. Sudheer','+91 9391833416','Student Coordinator',2),
(1,'Y. Gayathri','+91 7569953276','Student Coordinator',3),
(1,'Nyama','+91 8247089641','Student Coordinator',4),
(1,'Mr. M. Deheerendra','+91 8688423792','TA Support',5),
(1,'Mr. Hemanth','','Research Scholar Support',6);
INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(2,'autocad','EVT-02','AutoCAD','2D Engineering Drawing','ruler2','digital','AutoCAD & Design','Individual',false,1,1,'As specified on event day','₹6,000 / ₹4,000 / ₹2,000','Participants demonstrate proficiency in AutoCAD by producing 2D engineering drawings based on a problem statement provided on the day of the event. Tests accuracy, drafting standards, and speed.','CAD Lab (Block B)','Oct 10, 2026','02:00 PM','#f43f5e','/images/events/cad-drafting.png','Published',2);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(2,'Drawing problem statement revealed at the start of the event',1),
(2,'Participants must create drawings from scratch during allotted time; pre-drawn templates prohibited',2),
(2,'Internet access restricted during the event',3),
(2,'All drawings must follow standard civil/structural drafting conventions',4),
(2,'Final file must be saved in .dwg format',5);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(2,'Accuracy','Dimensional correctness and alignment with given specifications',30,1),
(2,'Drawing Standards','Use of correct line types, layers, dimensions, and title block',20,2),
(2,'Use of AutoCAD Tools','Efficient and appropriate use of AutoCAD commands and features',20,3),
(2,'Completeness','All required views, dimensions, and annotations present',20,4),
(2,'Neatness','Clean, organized drawing with no stray lines or clutter',10,5);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(2,'Dr. P. Parthiban','','Faculty Advisor',1),
(2,'Yonus','+91 9014762937','Student Coordinator',2),
(2,'G. Subha Rao','+91 9491833946','Student Coordinator',3),
(2,'P. Karthikeya','+91 9347907935','Student Coordinator',4),
(2,'Ms. Bhanu Priya','+91 9515556869','TA Support',5),
(2,'Mr. Leela Krishna','','Research Scholar Support',6);
INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(3,'ai-project','EVT-03','AI Project - Prototype/Live Model Challenge','AI Application in Civil Engineering','brain','digital','Programming / Computing','2-3 Members',true,2,3,'Exhibition Format','₹6,000','Teams tackle a real civil engineering problem using an AI-based solution, presented as a technically rigorous A0 poster accompanied by a live demonstration of the working AI system or prototype.','Computing Lab (Block A)','Oct 10, 2026','09:30 AM','#f59e0b','/images/events/code-breaker.png','Published',3);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(3,'Poster Format: A0 size, portrait orientation',1),
(3,'A working AI system/prototype must be demonstrated alongside the poster',2),
(3,'Poster must include Title, Problem Statement, Proposed AI Solution, Methodology, Results, Validation, and AI Disclosure',3),
(3,'AI-assisted/AI-generated poster designs allowed, but technical content must reflect genuine work',4);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(3,'Problem Relevance','Significance and genuineness of the civil engineering problem addressed',10,1),
(3,'Technical Depth','Soundness of the AI approach, methodology, and engineering understanding shown',25,2),
(3,'Prototype/Demo Functionality','Whether the accompanying AI system/prototype actually works as claimed',25,3),
(3,'Results & Validation','Quality and credibility of results, accuracy metrics, and validation shown',20,4),
(3,'Poster Clarity','Visual clarity, legibility, and completeness of the mandatory poster content',10,5),
(3,'Communication & Q&A','Team''s ability to explain their work and respond to judges'' questions',10,6);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(3,'Dr. A. V. A. Bharat Kumar','','Faculty Advisor',1),
(3,'Kasams','+91 8074399541','Student Coordinator',2),
(3,'A. Sravya','+91 7569978547','Student Coordinator',3),
(3,'Priyanshu Kumar','+91 7255836150','Student Coordinator',4),
(3,'Mr. Ravi','+91 9182745849','TA Support',5),
(3,'Mr. V. Suresh','','Research Scholar Support',6);
INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(4,'technical-quiz','EVT-04','Technical Quiz (Spot)','Rapid Recall','bolt','knowledge','General Civil Engineering','2 Members',true,2,2,'60-90 minutes','₹6,000','A fast-paced on-the-spot quiz testing knowledge of core civil engineering concepts across structural, geotechnical, water resources, transportation, and construction technology.','Main Auditorium','Oct 9, 2026','03:00 PM','#10b981','/images/events/technical-quiz.png','Published',4);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(4,'Strictly 2 members per team; individual participation not permitted',1),
(4,'Round 1 - Written Elimination: 20-question written MCQ paper',2),
(4,'Round 2 - Board Blitz Round: 30 seconds to discuss and write answer on the board',3),
(4,'Round 3 - Rapid Fire Final: 10 rapid-fire questions in 60 seconds',4),
(4,'No electronic devices, textbooks, or notes allowed',5);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(4,'Written Elimination','Top 10 teams advance to Round 2',0,1),
(4,'Board Blitz','+10 points for correct answer; top 3 teams advance to Final',10,2),
(4,'Rapid Fire','Cumulative scores from Rounds 2 & 3 determine final ranking',10,3);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(4,'Dr. J. Gopala Rao','','Faculty Advisor',1),
(4,'Ch. Sandya','+91 9603374146','Student Coordinator',2),
(4,'Makanaka Jakeera','','Student Coordinator',3),
(4,'Teja','+91 9705639558','Student Coordinator',4),
(4,'Ms. M. Raja Kumar','+91 7981504225','TA Support',5),
(4,'Ms. Bajamma','','Research Scholar Support',6);
INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(5,'paper-presentation','EVT-05','Paper Presentation','Research Symposium','file-text','knowledge','Academic Research','1-2 Members',true,1,2,'10 mins + 3 mins Q&A','₹6,000 / ₹4,000 / ₹2,000','Provides a platform to showcase research knowledge, technical understanding, and communication skills. Participants present an original or review paper on a civil engineering topic.','Seminar Hall A','Oct 10, 2026','11:00 AM','#3b82f6','/images/events/paper-present.png','Published',5);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(5,'One-page abstract must be submitted at registration',1),
(5,'PPT must be prepared in advance (10-20 slides)',2),
(5,'A printed copy of the full paper must be submitted on the day, bound with tape',3),
(5,'Reading directly from slides or notes is discouraged',4),
(5,'Strict time limit: presentation stopped at 10 minutes',5);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(5,'Technical Content','Depth of knowledge, relevance, accuracy, and originality of the paper',40,1),
(5,'Presentation Quality','Slide design, organization, use of visuals, and flow',25,2),
(5,'Communication Skills','Clarity, confidence, eye contact, and time management',20,3),
(5,'Q&A Performance','Technical correctness and depth of answers to judges'' questions',15,4);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(5,'Prof. A. Siva Sankar','','Faculty Advisor',1),
(5,'P. Venkat','+91 8179430389','Student Coordinator',2),
(5,'Sai Dinesh','+91 9391766840','Student Coordinator',3),
(5,'Nothando Have G','+91 6301698413','Student Coordinator',4),
(5,'Ms. Sandya','+91 6305335644','TA Support',5),
(5,'Mr. Sangeetha Rao','','Research Scholar Support',6);
INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(6,'smart-mix','EVT-06','Smart Mix - Lightweight Concrete','Material Science Challenge','flask','structural','Material Science','2-3 Members',true,2,3,'Exhibition / Testing','₹7,500 / ₹5,000 / ₹2,500','Participants design and cast a lightweight concrete cube, balancing strength and weight. Teams are judged primarily on strength-to-weight ratio.','Concrete Lab (Block C)','Oct 9, 2026','01:30 PM','#8b5cf6','/images/events/smart-mix.png','Published',6);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(6,'Design and cast a lightweight concrete cube beforehand and bring to the event',1),
(6,'Use standard cube mould size and standard curing period',2),
(6,'Take geo-tagged photos during the mixing, casting, and curing stages',3),
(6,'Each team must be prepared to briefly explain their mix design to judges',4);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(6,'Strength-to-Weight Ratio','Primary criterion — compressive strength achieved divided by density of the cured cube',40,1),
(6,'Compressive Strength','Absolute load-bearing capacity of the cube at testing',20,2),
(6,'Innovation in Materials','Use of lightweight aggregates, admixtures, or novel proportioning techniques',15,3),
(6,'Construction Quality','Neatness of casting, surface finish, and dimensional accuracy of the cube',15,4),
(6,'Presentation','Team''s ability to explain their mix design rationale to judges',10,5);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(6,'Dr. P. Rakesh','','Faculty Advisor',1),
(6,'K. Narendra','+91 7780322102','Student Coordinator',2),
(6,'E. V. Vijay Babu','+91 7995084726','Student Coordinator',3),
(6,'Mr. Ravi','+91 9182745849','TA Support',4),
(6,'Ms. Manjari','','Research Scholar Support',5);
INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(7,'technical-treasure-hunt','EVT-07','Technical Treasure Hunt','Logic & Spatial Reasoning','puzzle','creative','Logic & Aptitude','1-3 Members',true,1,3,'Trail based','₹3,000 / ₹2,000 / ₹1,000','A fast-paced, campus-wide challenge where teams follow a trail of technical clues to solve engineering-based puzzles. Speed, teamwork, and technical accuracy all matter.','Campus Wide (Start at Classroom 101)','Oct 9, 2026','11:30 AM','#eab308','/images/events/puzzle-challenge.png','Published',7);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(7,'Teams must stay together and follow the designated trail route',1),
(7,'Each clue leads to a location or requires solving an engineering-based puzzle',2),
(7,'Use of mobile phones or external help is strictly prohibited unless a clue explicitly permits it',3),
(7,'Skipping a checkpoint or clue without solving it incurs a time penalty',4);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(7,'Completion Time','Primary criterion — total time taken to solve all clues and reach the final checkpoint',50,1),
(7,'Accuracy','Correctness of solutions at each checkpoint; incorrect answers may incur time penalties',35,2),
(7,'Teamwork','Coordination and collaboration observed among team members during the hunt',15,3);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(7,'Mr. K. Bala Gopi Krishna','','Faculty Advisor',1),
(7,'Anashe','+91 6301434223','Student Coordinator',2),
(7,'Jashuva','+91 9966525555','Student Coordinator',3),
(7,'Chiranjeevi Nayak','+91 6302536557','Student Coordinator',4),
(7,'Mr. Chaitanya','+91 7075869731','TA Support',5);
INSERT INTO events (id,slug,code,title,subtitle,icon_name,category,domain,team_size_text,is_team_event,min_team_size,max_team_size,duration,prize,overview,venue,event_date,event_time,color,image_path,status,display_order) OVERRIDING SYSTEM VALUE VALUES
(8,'model-making','EVT-08','Model Making - Structural Showcase','Scale Models','building-monument','creative','Urban Planning','2-3 Members',true,2,3,'Exhibition & Presentation','₹8,000 / ₹5,000 / ₹2,500','Participants choose one of four world-famous structures and build a scale model of it using any material of choice. Alongside the model, teams deliver a structured presentation.','Exhibition Hall','Oct 10, 2026','All Day','#ec4899','/images/events/model-making.png','Published',8);
INSERT INTO event_rules (event_id,rule_text,display_order) VALUES
(8,'Assigned Structures Pool: Burj Khalifa, Eiffel Tower, Lotus Temple, or Taj Mahal',1),
(8,'Model dimensions must not exceed 600 mm × 600 mm × 800 mm (L × W × H)',2),
(8,'Model must be constructed before the event and brought on the day',3),
(8,'Presentation must strictly follow the provided 10-slide structure focusing on Engineering facts and reasoning',4);
INSERT INTO judging_criteria (event_id,name,detail,max_marks,display_order) VALUES
(8,'Aesthetics','Visual appeal of the model — how closely it resembles the real structure in look and feel',15,1),
(8,'Accuracy','How well the model captures the proportions, key features, and defining elements of the assigned structure',15,2),
(8,'Stiffness & Stability','Model must stand firmly without support — delicate or wobbly models will be penalized',10,3),
(8,'Finishing','Cleanliness of construction — no rough edges, excessive exposed glue, or incomplete sections',10,4),
(8,'6 Wow/Key Engineering Facts (Slides 3–4)','Depth and surprise value of engineering facts — carries highest weightage in presentation score',15,5),
(8,'Engineering Reasoning (Slides 5–6)','Quality of explanation behind the facts — shows understanding, not just memorisation',12,6),
(8,'Technical Overview (Slides 7–8)','Correctness of structural and technical explanation — brief but accurate',8,7),
(8,'Bonus Marks (Slides 9–13)','Clear presentation on mentioned points',5,8),
(8,'Q&A Response','Accuracy and confidence in answering judges'' questions',10,9);
INSERT INTO event_coordinators (event_id,name,phone,role,display_order) VALUES
(8,'Dr. M. V. Raju','','Faculty Advisor',1),
(8,'Simba','+91 9392410215','Student Coordinator',2),
(8,'K. Rishitha','+91 7075721415','Student Coordinator',3),
(8,'Sai Saranya','+91 6305093698','Student Coordinator',4),
(8,'Ms. Bhanu Priya','+91 9515556869','TA Support',5),
(8,'Mr. Praveen Kumar Pandey','','Research Scholar Support',6);
