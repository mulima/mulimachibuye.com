import {
  createPublication,
  createEducation,
} from './db-queries';

export function seedAcademicData() {
  try {
    // Insert publications
    const publications = [
      {
        title: "A Remote Sensor Network using Android Things and Cloud Computing for the Food Reserve Agency in Zambia",
        authors: "Mulima Chibuye, Dr. Jackson Phiri",
        venue: "International Journal of Advanced Computer Science and Applications(IJACSA), Volume 8 Issue 11",
        year: "2017",
        type: "Journal Article",
        status: "Published",
        abstract: "This paper presents novel machine learning approaches for optimizing distributed systems performance, focusing on load balancing and resource allocation strategies.",
        doi: "10.14569/IJACSA.2017.081150",
        pdf_url: "https://thesai.org/Downloads/Volume8No11/Paper_50-A_Remote_Sensor_Network_using_Android_Things.pdf",
        citations: 31,
        display_order: 0,
      },
      {
        title: "Current Trends in Machine-Based Predictive Analysis in Agriculture for Better Crop Management - A Systematic Review",
        authors: "Mulima Chibuye, Dr. Jackson Phiri",
        venue: "Zambia Information Communication Technology (ICT) Journal",
        year: "2023",
        type: "Journal Article",
        status: "Published",
        abstract: "A comprehensive analysis of modern web architecture patterns and their scalability characteristics in cloud-native environments.",
        doi: "10.33260/zictjournal.v7i1.147",
        pdf_url: "https://ictjournal.icict.org.zm/index.php/zictjournal/article/view/147/67",
        citations: 3,
        display_order: 1,
      },
      {
        title: "Towards Artificial General Intelligence - A Survey of Hyperdimensional Computing and Vector Symbolic Architectures with Quantum Computing for Multivariate Predictions",
        authors: "Mulima Chibuye, Dr. Jackson Phiri",
        venue: "Zambia Information Communication Technology (ICT) Journal",
        year: "2023",
        type: "Journal Article",
        status: "Published",
        abstract: "To achieve true artificial intelligence would be to mimic the human brain. Some have espoused that current systems that we call AI today are nothing more than if-else statements. There are other arguments that state that indeed, the act of decision making itself is a bunch of nested if-else statements. However, we note that the human brain and through processes that are far more complicated than that has levels of cognition that far outweigh those of any machines that have been made today. While computing systems perform better at certain tasks than human beings do, they remain inherently specific. Human minds are generally creative and knowledge making entities. In this paper, we explore the current progress made towards achieving Artificial General Intelligence and look at it from the angle of Hyperdimensional Computing and Vector Symbolic Architectures both running with the power of quantum computing. We explain how the achievement of AGI will lead to a much more sustainable form of industrial development as has been touted through advancements towards the Fourth Industrial Revolution.",
        doi: "10.33260/zictjournal.v7i2.265",
        pdf_url: "https://ictjournal.icict.org.zm/index.php/zictjournal/article/view/265/117",
        citations: 15,
        display_order: 2,
      },
    ];

    publications.forEach(pub => {
      createPublication(pub);
    });

    // Insert education
    const educationData = [
      {
        degree: "M.S. in Computer Science",
        institution: "University of Zambia, Lusaka",
        location: "Lusaka, ZM",
        duration: "2016 - 2019",
        thesis: "A Remote Sensor Network using Android Things and Cloud Computing for the Food Reserve Agency in Zambia",
        advisor: "Prof Jackson Phiri",
        gpa: "3.8/4.0",
        honors: null,
        display_order: 0,
      },
      {
        degree: "B.S. in Computer Engineering",
        institution: "University of Zambia",
        location: "Lusaka, ZM",
        duration: "2004 - 2008",
        thesis: null,
        advisor: null,
        gpa: null,
        honors: "Graduated with Merit",
        display_order: 1,
      },
    ];

    educationData.forEach(edu => {
      createEducation(edu);
    });

    console.log('Academic data seeded successfully');
  } catch (error) {
    console.error('Error seeding academic data:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAcademicData();
  console.log('Academic data seed complete!');
  process.exit(0);
}
