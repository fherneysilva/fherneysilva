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
      tagline: "Building technology that scales.",
      role: "Senior Software Engineer, Tech Lead & CEO of Siscodex.",
      desc:
        "I build cloud infrastructure by day and lead my own software company by night. Between architecture, code, and personal projects, I always find time for the occasional video game. Every now and then, it all happens at once.",
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
      badge: "Launching August 2026",
      heading: "Siscodex",
      text: [
        "I'm the founder and CEO of Siscodex, a technology company I lead alongside three co-founding partners, with a clear mission: helping organizations grow and evolve without technical limits. We lead the design and development of software solutions and cloud infrastructure that are solid, scalable, and built to meet the needs of constantly evolving businesses.",
        "At Siscodex, we combine high-level engineering, modern architecture, and strategic vision to turn complex challenges into efficient, sustainable, high-impact technology solutions. We work as a strategic technology partner for our clients, supporting them from their current challenges to their next stage of growth.",
        "We build the technology that lets businesses grow today and stay ready for what's next.",
      ],
      servicesLabel: "What we do",
      services: [
        {
          title: "Custom Software",
          desc: "Custom web and mobile application development with modern technologies, ensuring clean, maintainable code.",
        },
        {
          title: "Cloud Infrastructure",
          desc: "DevOps automation, CI/CD, containerization and infrastructure as code (IaC) management.",
        },
        {
          title: "Platform Modernization",
          desc: "Migrating legacy systems to modern architectures based on microservices and cloud-native technologies.",
        },
      ],
      whyLabel: "Why Siscodex",
      why: [
        {
          title: "Direct access",
          desc: "You work directly with the engineers building your product.",
        },
        {
          title: "Cloud expertise",
          desc: "Secure, efficient architecture from day one.",
        },
        {
          title: "Built to scale",
          desc: "Clean, modular code ready for what's next.",
        },
        {
          title: "Senior engineering",
          desc: "Experience and best practices in every line of code.",
        },
      ],
      processLabel: "How we work",
      process: ["Discovery", "Planning", "Development", "Launch"],
      ctaText: "Looking for a technology partner for your next project?",
      ctaButton: "Let's talk",
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
      tagline: "Construyendo tecnología que escala.",
      role: "Senior Software Engineer, Tech Lead y CEO de Siscodex.",
      desc:
        "Construyo infraestructura cloud de día y lidero mi propia empresa de software de noche. Entre arquitectura, código y proyectos personales, siempre encuentro tiempo para algún videojuego. De vez en cuando, todo pasa al mismo tiempo.",
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
      badge: "Lanzamos agosto 2026",
      heading: "Siscodex",
      text: [
        "Soy fundador y CEO de Siscodex, una empresa de tecnología que lidero junto a tres socios cofundadores, con una misión clara: ayudar a las organizaciones a crecer y evolucionar sin límites técnicos. Lideramos el diseño y desarrollo de soluciones de software e infraestructura cloud sólidas, escalables y preparadas para responder a las necesidades de negocios en constante evolución.",
        "En Siscodex combinamos ingeniería de alto nivel, arquitectura moderna y visión estratégica para transformar desafíos complejos en soluciones tecnológicas eficientes, sostenibles y de alto impacto. Trabajamos como un aliado tecnológico estratégico para nuestros clientes, acompañándolos desde sus retos actuales hasta sus próximos desafíos de crecimiento.",
        "Construimos la tecnología que permite a las empresas crecer hoy y estar preparadas para lo que viene.",
      ],
      servicesLabel: "Qué hacemos",
      services: [
        {
          title: "Software a Medida",
          desc: "Desarrollo de aplicaciones web y móviles personalizadas con tecnologías modernas, asegurando código limpio y mantenible.",
        },
        {
          title: "Infraestructura Cloud",
          desc: "Automatización DevOps, CI/CD, contenedorización y gestión de infraestructura como código (IaC).",
        },
        {
          title: "Modernización de Plataformas",
          desc: "Migración de sistemas legados a arquitecturas modernas basadas en microservicios y tecnologías cloud-native.",
        },
      ],
      whyLabel: "Por qué Siscodex",
      why: [
        {
          title: "Trato directo",
          desc: "Trabajas directo con los ingenieros que construyen tu producto.",
        },
        {
          title: "Experiencia cloud",
          desc: "Arquitectura segura y eficiente desde el día uno.",
        },
        {
          title: "Listo para escalar",
          desc: "Código limpio y modular, preparado para lo que sigue.",
        },
        {
          title: "Ingeniería senior",
          desc: "Experiencia y buenas prácticas en cada línea de código.",
        },
      ],
      processLabel: "Cómo trabajamos",
      process: ["Descubrimiento", "Planeación", "Desarrollo", "Lanzamiento"],
      ctaText: "¿Buscas un aliado tecnológico para tu próximo proyecto?",
      ctaButton: "Hablemos",
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
