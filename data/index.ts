export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Tools", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "Data tells a story—I build the tools that let you read it, use it, and act on it. ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "From models to insights — I stay in sync at every step.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Driven by data, powered by code..",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Exploring the full data science workflow—from raw data to real-world decisions.",
    description: "Under the Hood",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Got a data idea? Let’s bring it to life together.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: " Attendance System",
    des: "An automated attendance Facial Recognition monitoring system using Python, OpenCV, and deep learning that detects, identifies, and logs faces in real-time.",
    img: "/p12.jpg",
    iconLists: ["/tensor.svg", "/open.svg", "/git.svg", "/python.svg", "/vscode.svg"],
    link: "https://github.com/ajaychaudhary2/Motitering_system_using_Facial_recognition",
  },
  {
    id: 2,
    title: "Number Plate Detection",
    des: "A real-time vehicle number plate detection system using YOLOv8 and Tesseract OCR that identifies and extracts license numbers from input video feeds.",
    img: "/p3.jpg",
    iconLists: ["/ut.svg", "/git.svg", "/python.svg", "/vscode.svg", "/tensor.svg"],
    link: "https://github.com/ajaychaudhary2/Vehicle-Number-Plate-Detection-Yolov8-OCR",
  },
  {
    id: 3,
    title: "Finance chatbot",
    des: "A conversational finance chatbot built with a fine-tuned Zephyr-7B model using the FIQA dataset that provides real-time answers and financial guidance.",
    img: "/p2.jpg",
    iconLists: ["/hugging.svg", "/tensor.svg",  "/git.svg", "/vscode.svg", "/python.svg"],
    link: "",
  },
  {
    id: 4,
    title: "Brain Tumor Detection",
    des: "A deep learning-based CNN model that detects brain tumors from MRI scans with high accuracy and  The system provides consistent results and is designed for smooth integration.",
    img: "/p4.jpg",
    iconLists: ["/vscode.svg", "/tensor.svg", "/git.svg", "/python.svg", "/gitc.svg"],
    link: "https://github.com/ajaychaudhary2/Brain-Tumor-Detection-using-CNN",
  },
  {
    id: 5,
    title: "Flight Price Prediction ML",
    des: "A machine learning model that predicts flight ticket prices based on features like airline, duration, stops, and departure time. The system uses feature engineering , regression algorithms.",
    
    img: "/p5.jpg",
    iconLists: ["/sckit.svg", "/panda.svg", "/vscode.svg", "/git.svg", "/python.svg"],
    link: "https://github.com/ajaychaudhary2/FlightPricePredictionML",
  },
  {
    id: 6,
    title: "Pneumonia Detection",
    des: "A pneumonia detection system using Detectron2 and Faster R-CNN that identifies infected regions in chest X-rays with precision and includes real-time visualization of predictions.",
    img: "/p6.jpg",
    iconLists: ["/pytorch.svg", "/python.svg", "/git.svg", "/jupyter.svg", "/vscode.svg"],
    link: "https://github.com/ajaychaudhary2/pneumonia-detection-detectron2",
  },
];

export const testimonials = [
  {
    quote:
       "Handling real-world datasets requires precision, efficiency, and deep understanding of data structures. With the use of Python, along with powerful libraries like Pandas and NumPy, massive volumes of raw, unstructured data were cleaned, transformed, and made analysis-ready. The structured pipeline enabled rapid prototyping of ML models and deep insights into key trends, all while maintaining high code readability and modular design. These tools formed the backbone of every data project executed.",
     name: "Python, Pandas, NumPy",
    title: "Core Tools for Data Analysis & Manipulation",
     image: "/cd.svg",
   
  },
  {
    name: "Matplotlib, Seaborn, Plotly",
    title: "Data Visualization & Insight Communication",
    quote:
       "Visual storytelling played a major role in making data science accessible to all stakeholders. Using Matplotlib and Seaborn, complex analyses were transformed into elegant, publication-quality visuals, while Plotly enabled interactive dashboards for real-time exploration. Every visualization delivered not only insights, but also clarity — making decision-making faster and more informed. The skillful use of color theory, labeling, and plot selection made a strong impact throughout the data lifecycle.",
    image: "/dat.svg",
  },
  {
    name:  "Scikit-learn, XGBoost, LightGBM",
    title: "Machine Learning, Modeling & Evaluation",
    quote:
          "Advanced predictive modeling was driven by a well-rounded ML toolkit. Scikit-learn laid the foundation with pipelines and metrics, while XGBoost and LightGBM powered high-performance, scalable models suitable for real-world deployment. Feature selection, cross-validation, hyperparameter tuning, and interpretability tools like SHAP were used to ensure that models were not only accurate but trustworthy. The approach balanced data science theory with engineering best practices for impactful results.",
    image: "/lg.svg",
    
  },
  {
    name:  "Flask, FastAPI",
    title: "Model Deployment & API Architecture",
    quote:
     "One of the standout aspects of full stack data science was the seamless transition from training models to serving them live. Flask and FastAPI were used to wrap ML models into clean, production-ready REST APIs with proper routing, CORS handling, and documentation. This enabled real-time inference in both web apps and external systems. The backend code followed modular practices, making it easy to scale, maintain, and deploy in both development and production environments.",
    image: "/flak.svg", 
  },
  {
    name: "Deep Learning & NLP Integration",
    title: "User Interfaces for AI-Powered Applications",
    quote:
       "AI isn’t just about models — it's about how users interact with them. Clean and responsive frontend interfaces were built using HTML, CSS, and JavaScript to enable seamless interaction with deep learning and NLP models. These interfaces powered applications like chatbots, summarizers, and Q&A systems, allowing real-time communication between users and language models via REST APIs. Emphasis was placed on intuitive design, smooth UX, and accurate feedback delivery from the backend models — turning complex AI functionality into user-friendly tools.",
    image: "/ab.svg",
    
  },
];

export const companies = [
  {
    id: 1,
    img: "/pytool2.svg",
  },
  {
    id: 2,
    img: "/ternsor.svg",
  },
  {
    id: 3,
    img: "/pand.svg",
  },
  {
    id: 4,
    img: "/hugi.svg",
  },
  {
    id: 5,
    img: "/skit.svg",
  },
  {
    id: 6,
    img: "/uta.svg",
  },
  {
    id: 7,
    img: "/gitool.svg",
  },
 
   {
    id: 8,
    img: "/fla.svg",
  },
   {
    id: 9,
    img: "/sea.svg",
  },
   {
    id: 10,
    img: "/matplot.svg",
  },
   {
    id: 11,
    img: "/mysql.svg",
  },
 {
    id: 12,
    img: "/nump.svg",
  },
  {
    id: 12,
    img: "/image.svg",
  },
  {
    id: 12,
    img: "/gi.svg",
  },
];

export const workExperience = [
  {
    id: 1,
     title: "Full Stack Data Science Certification – iNeuron.ai",
  desc: "Successfully completed a comprehensive Full Stack Data Science course covering the entire data lifecycle — from data cleaning and analysis to model deployment and monitoring. Key modules included Python programming, Pandas, SQL, Machine Learning, Deep Learning (CNNs, RNNs), Model Evaluation, and MLOps. Built real-world projects such as Brain Tumor Detection using CNN, Pneumonia Detection with Faster R-CNN, and a Finance Advisor Chatbot using LLMs. Deployed models using platforms like Lightning AI and gained proficiency in Git, Streamlit, Flask, and Docker for end-to-end production readiness.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
      title: "Certifications & Internship Projects  Coursera, YouTube, iNeuron.ai",
  desc: "Completed over 15 self-paced certifications across Coursera, YouTube, and Fast.ai, covering Prompt Engineering, REST APIs, GitHub workflows, DevOps fundamentals, and ChatGPT fine-tuning. Applied this knowledge during an internship project, where I built and deployed a practical solution, receiving both an experience letter and an offer letter. This hands-on experience, combined with self-learning, helped me stay ahead in fast-evolving technologies and boosted my real-world project development confidence.",
    className: "md:col-span-2", 
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Bachelor of Computer Applications – CHSG, CCS University",
    desc: "Currently pursuing BCA with a comprehensive curriculum covering core subjects like Data Structures, Operating Systems, Python Programming, and Web Technologies. Engaged in multiple academic and personal projects that involve web development, machine learning, and API integration. Actively contributing to the college coding club and collaborating on mini projects aimed at solving real-world problems..",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp4.svg",
  },
  {
    id: 4,
    title: "10th & 12th – Kendriya Vidyalaya, Bulandshahr",
    desc: "Completed both 10th and 12th from Kendriya Vidyalaya under the CBSE curriculum. Developed strong foundations in Computer Science, Mathematics, and English. Actively participated in coding competitions, science exhibitions, and tech quizzes. Consistently maintained excellent academic performance and secured distinction in Informatics Practices. These formative years sparked my early interest in technology and problem-solving.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/ajaychaudhary2?tab=repositories",
  },
   {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/ajay-chaudhary-02287a2ab/",
  },
  {
    id: 3,
    img: "/xlogo.svg",
    link: "https://x.com/ajaych2822",
  },
 
  {
    id: 4,
    img: "/telegram.svg",
    link: "https://www.linkedin.com/in/ajay-chaudhary-02287a2ab/",
  },
];
