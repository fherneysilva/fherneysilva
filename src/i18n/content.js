const content = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      software: "Software",
      siscodex: "Siscodex",
      blog: "Blog",
    },
    intro: {
      greeting: "hi, ",
      name: "fherney",
      nameSuffix: " here.",
      desc:
        "Software engineer and entrepreneur in Colombia. I build cloud infrastructure by day and grow my own software company by night — squeezing in personal projects and the occasional video game whenever I can. Occasionally both happen at the same time.",
      contact: "Contact me",
    },
    about: {
      sectionTitle: "/ about me",
      paragraphOne: [
        { text: "I am currently a " },
        { text: "Technical Lead", bold: true },
        { text: " at " },
        { text: "Experian", highlight: true },
        {
          text: ", where I lead the Cloud Foundation Team, building reusable AWS architecture. Previously, I was at ",
        },
        { text: "BBVA", highlight: true },
        { text: "." },
      ],
      techIntro: "Here are some technologies I have been working with:",
      techStack: ["Java", "Spring Boot", "AWS", "Terraform", "Docker", "Angular"],
      paragraphTwo:
        "Outside of hands-on development, I keep sharpening my cloud skills — currently working through AWS Skill Builder courses, with certifications in Cloud Computing and Cybersecurity along the way.",
      imageAlt: "Fherney Silva",
    },
    experience: {
      sectionTitle: "/ experience",
      jobs: {
        "Experian": {
          jobTitle: "Technical Lead & Senior Software Engineer @",
          duration: "DEC 2023 - PRESENT",
          desc: [
            "Leading the Cloud Foundation Team, building reusable, certified architectural components (self-service products) aligned with the AWS Well-Architected Framework.",
            "Automating infrastructure provisioning with Terraform across Lambda, API Gateway, IAM, SQS, and SNS.",
            "Mentoring and coaching the engineering team on IaC, CI/CD, and quality/governance standards.",
            "Worked on the migration of 20+ applications from legacy/Heroku infrastructure to AWS (Project H2C) using Terraform, Docker, and Java Spring Boot microservices.",
            "Designed serverless APIs with AWS Lambda, API Gateway, and DynamoDB, integrating authentication with Okta.",
            "Worked on the migration of APIs from EKS to ECS Fargate, cutting costs and simplifying deployments with Route 53, ALB, and NLB.",
          ],
        },
        BBVA: {
          jobTitle: "Development Engineer @",
          duration: "MAR 2022 - NOV 2023",
          desc: [
            "Built front-end services (Java Spring) for the Electronic Promissory Note / Pre-approved Consumer Credit flow in BBVA Net, including new ASO service integrations and end-to-end testing with Postman/Atenea.",
            "Developed back-end and messaging services (Java Spring MVC) for the Acquiring Transfers project in Net Cash.",
            "Worked in Scrum teams with Git/Bitbucket version control and code quality gates via Jenkins and Sonar.",
          ],
        },
        "Professional Care": {
          jobTitle: "Software Developer @",
          duration: "JAN 2021 - JAN 2022",
          desc: [
            "Built a Social Security System for employee affiliation in Cúcuta, using Java Spring Framework and MySQL.",
          ],
        },
        Freelance: {
          jobTitle: "Software Developer @",
          duration: "FEB 2020 - NOV 2020",
          desc: [
            "Delivered full-stack solutions for multiple clients: Mind21 (Angular/Node.js/MongoDB), a Bio Dx desktop app (Java EE/Spring Boot), and the Sonrilaser dental clinic website (Java Spring MVC/Angular).",
          ],
        },
      },
    },
    projects: {
      sectionTitle: "/ software",
      groupCloudTitle: "Cloud & Enterprise",
      groupFreelanceTitle: "Freelance & Personal",
      cloud: [
        {
          id: "cloud-ecosystem",
          title: "Modular Cloud Infrastructure Ecosystem",
          desc: "Reusable, certified architectural components delivered as self-service products on AWS.",
          techStack: "AWS (Lambda, API Gateway, IAM, SQS, SNS), Terraform, Docker, Spring Boot, Python, CI/CD",
        },
        {
          id: "eks-ecs",
          title: "API Migration – EKS to ECS",
          desc: "Migrated multiple APIs from Kubernetes (EKS) to ECS Fargate.",
          techStack: "Angular, AWS ECS/EKS, Terraform, Okta, Route 53, ALB, NLB, Java, Spring Boot",
        },
        {
          id: "busca-empresas",
          title: "Busca Empresas",
          desc: "Serverless architecture for managing company information.",
          techStack: "AWS Lambda (Python), API Gateway, DynamoDB, IAM, CloudFormation, Terraform",
        },
        {
          id: "h2c",
          title: "H2C (Heroku to Cloud)",
          desc: "Migrated Experian's main portal from Heroku to AWS (20+ apps).",
          techStack: "AWS, Terraform, Docker, Java, Spring Boot, Angular, GitHub CI/CD",
        },
      ],
      freelance: [
        {
          id: "mind21",
          title: "Mind21",
          desc: "A learning web app for children with Down syndrome.",
          techStack: "Angular, Node.js, MongoDB",
        },
        {
          id: "biodx",
          title: "Bio Dx Desktop App",
          desc: "Desktop application for a clinical laboratory.",
          techStack: "Java EE, Spring Boot",
        },
        {
          id: "sonrilaser",
          title: "Sonrilaser Dental Center",
          desc: "Website with backend for a dental clinic.",
          techStack: "Java Spring MVC, Angular",
        },
        {
          id: "social-security",
          title: "Social Security System",
          desc: "Employee affiliation system for a healthcare provider.",
          techStack: "Java Spring Framework, MySQL",
        },
      ],
    },
    siscodex: {
      sectionTitle: "/ my company",
      badge: "Coming soon",
      heading: "Siscodex",
      text: "My own software company — solid engineering for businesses that want to grow without limits. We design scalable web and mobile apps on optimized cloud infrastructure. Officially launching soon.",
    },
    blog: {
      sectionTitle: "/ blog",
      eyebrow: "Latest thoughts",
      text: "I occasionally write about backend, cloud, and the things I'm learning along the way. New posts land on Hashnode — come say hi.",
      tags: ["Cloud", "Backend", "Career", "Entrepreneurship", "Life", "Gaming"],
      cta: "Read my blog",
      url: "https://fherneysilva.hashnode.dev/",
    },
    credits: {
      line1: "Built and designed by Fherney Silva.",
      line2: "© {year} All rights reserved.",
      backToTop: "Back to top",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      experience: "Experiencia",
      software: "Software",
      siscodex: "Siscodex",
      blog: "Blog",
    },
    intro: {
      greeting: "hola, ",
      name: "fherney",
      nameSuffix: " aquí.",
      desc:
        "Ingeniero de software y emprendedor en Colombia. Construyo infraestructura cloud de día y hago crecer mi propia empresa de software de noche — sacando tiempo para proyectos personales y algún videojuego cuando puedo. De vez en cuando, ambas cosas pasan al mismo tiempo.",
      contact: "Contáctame",
    },
    about: {
      sectionTitle: "/ sobre mí",
      paragraphOne: [
        { text: "Actualmente soy " },
        { text: "Technical Lead", bold: true },
        { text: " en " },
        { text: "Experian", highlight: true },
        {
          text: ", donde lidero el Cloud Foundation Team, construyendo arquitectura reutilizable en AWS. Antes trabajé en ",
        },
        { text: "BBVA", highlight: true },
        { text: "." },
      ],
      techIntro: "Estas son algunas tecnologías con las que he trabajado:",
      techStack: ["Java", "Spring Boot", "AWS", "Terraform", "Docker", "Angular"],
      paragraphTwo:
        "Fuera del desarrollo diario, sigo afilando mis habilidades cloud — actualmente cursando AWS Skill Builder, con certificaciones en Cloud Computing y Ciberseguridad en el camino.",
      imageAlt: "Fherney Silva",
    },
    experience: {
      sectionTitle: "/ experiencia",
      jobs: {
        "Experian": {
          jobTitle: "Technical Lead y Senior Software Engineer @",
          duration: "DIC 2023 - ACTUALIDAD",
          desc: [
            "Lidero el Cloud Foundation Team, construyendo componentes arquitectónicos reutilizables y certificados (productos autoservicio) alineados al AWS Well-Architected Framework.",
            "Automatización de aprovisionamiento de infraestructura con Terraform en Lambda, API Gateway, IAM, SQS y SNS.",
            "Mentoring y coaching técnico al equipo en IaC, CI/CD y estándares de calidad y gobernanza.",
            "Participé en la migración de más de 20 aplicaciones desde infraestructura tradicional/Heroku hacia AWS (proyecto H2C), usando Terraform, Docker y microservicios Java Spring Boot.",
            "Diseñé APIs serverless con AWS Lambda, API Gateway y DynamoDB, integrando autenticación con Okta.",
            "Participé en la migración de APIs de EKS a ECS Fargate, optimizando costos y simplificando despliegues con Route 53, ALB y NLB.",
          ],
        },
        BBVA: {
          jobTitle: "Ingeniero de Desarrollo @",
          duration: "MAR 2022 - NOV 2023",
          desc: [
            "Desarrollo Front-end (Java Spring) para el flujo de Pagaré Electrónico / Crédito de Consumo Preaprobados en BBVA Net, incluyendo integración de nuevos servicios ASO y pruebas integrales con Postman/Atenea.",
            "Desarrollo Backend/Mensajería (Java Spring MVC) para el proyecto Traslados de Adquirencia en Net Cash.",
            "Trabajo en equipos Scrum, control de versiones con Git/Bitbucket y calidad de código con Jenkins y Sonar.",
          ],
        },
        "Professional Care": {
          jobTitle: "Desarrollador de Software @",
          duration: "ENE 2021 - ENE 2022",
          desc: [
            "Desarrollo del Sistema de Seguridad Social (afiliación de empleados) en Cúcuta, con Java Spring Framework y MySQL.",
          ],
        },
        Freelance: {
          jobTitle: "Desarrollador de Software @",
          duration: "FEB 2020 - NOV 2020",
          desc: [
            "Desarrollo full stack para varios clientes: Mind21 (Angular/Node.js/MongoDB), app de escritorio Bio Dx (Java EE/Spring Boot) y el sitio del Centro Odontológico Sonrilaser (Java Spring MVC/Angular).",
          ],
        },
      },
    },
    projects: {
      sectionTitle: "/ software",
      groupCloudTitle: "Cloud y Empresariales",
      groupFreelanceTitle: "Freelance y Personales",
      cloud: [
        {
          id: "cloud-ecosystem",
          title: "Ecosistema de Infraestructura Cloud Modular",
          desc: "Componentes arquitectónicos reutilizables y certificados, entregados como productos autoservicio en AWS.",
          techStack: "AWS (Lambda, API Gateway, IAM, SQS, SNS), Terraform, Docker, Spring Boot, Python, CI/CD",
        },
        {
          id: "eks-ecs",
          title: "Migración de APIs – EKS a ECS",
          desc: "Migración de múltiples APIs de Kubernetes (EKS) a ECS Fargate.",
          techStack: "Angular, AWS ECS/EKS, Terraform, Okta, Route 53, ALB, NLB, Java, Spring Boot",
        },
        {
          id: "busca-empresas",
          title: "Busca Empresas",
          desc: "Arquitectura serverless para la gestión de información empresarial.",
          techStack: "AWS Lambda (Python), API Gateway, DynamoDB, IAM, CloudFormation, Terraform",
        },
        {
          id: "h2c",
          title: "H2C (Heroku to Cloud)",
          desc: "Migración del portal principal de Experian desde Heroku a AWS (20+ apps).",
          techStack: "AWS, Terraform, Docker, Java, Spring Boot, Angular, GitHub CI/CD",
        },
      ],
      freelance: [
        {
          id: "mind21",
          title: "Mind21",
          desc: "App web de aprendizaje para niños con Síndrome de Down.",
          techStack: "Angular, Node.js, MongoDB",
        },
        {
          id: "biodx",
          title: "App de Escritorio Bio Dx",
          desc: "Aplicación de escritorio para un laboratorio clínico.",
          techStack: "Java EE, Spring Boot",
        },
        {
          id: "sonrilaser",
          title: "Centro Odontológico Sonrilaser",
          desc: "Sitio web con backend para un centro odontológico.",
          techStack: "Java Spring MVC, Angular",
        },
        {
          id: "social-security",
          title: "Sistema de Seguridad Social",
          desc: "Sistema de afiliación de empleados para una entidad de salud.",
          techStack: "Java Spring Framework, MySQL",
        },
      ],
    },
    siscodex: {
      sectionTitle: "/ mi empresa",
      badge: "Próximamente",
      heading: "Siscodex",
      text: "Mi propia empresa de tecnología — ingeniería de software sólida para empresas que buscan crecer sin límites. Diseñamos aplicaciones web y móviles escalables sobre infraestructura en la nube optimizada. Lanzamiento oficial próximamente.",
    },
    blog: {
      sectionTitle: "/ blog",
      eyebrow: "Últimas reflexiones",
      text: "De vez en cuando escribo sobre backend, cloud y lo que voy aprendiendo en el camino. Publico en Hashnode — pásate a saludar.",
      tags: ["Cloud", "Backend", "Carrera", "Emprendimiento", "Vida", "Videojuegos"],
      cta: "Leer mi blog",
      url: "https://fherneysilva.hashnode.dev/",
    },
    credits: {
      line1: "Diseñado y construido por Fherney Silva.",
      line2: "© {year} Todos los derechos reservados.",
      backToTop: "Volver arriba",
    },
  },
};

export default content;
