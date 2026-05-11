import { Injectable } from '@nestjs/common';

@Injectable()
export class CareerService {
  recommend(data: any) {
    if (!data) {
      return { recommendation: "Invalid request data" };
    }

    const name = data.name || "User";
    const skills = data.skills || "";
    const interests = data.interests || "";
    const education = data.education || "";
    const experience = data.experience || "";

    let role = "Software Developer";

    // Skill-based logic
    if (skills === "UI/UX Designing") {
      role = "UI/UX Designer";
    } else if (skills === "Data Analysis") {
      role = "Data Analyst";
    } else if (skills === "Cyber Security") {
      role = "Cyber Security Expert";
    } else if (skills === "Digital Marketing") {
      role = "Digital Marketing Specialist";
    } else if (skills === "Project Management") {
      role = "Project Manager";
    } else if (skills === "Programming") {
      role = "Full Stack Developer";
    }

    // Interest override (extra smart logic)
    if (interests === "Finance") {
      role = "Financial Analyst";
    } else if (interests === "Healthcare") {
      role = "Healthcare Data Analyst";
    } else if (interests === "Technology") {
      role = role; // keep same
    }

    return {
      recommendation: `${role} is a great career for ${name} with ${education}, ${skills}, and ${experience}.`,
    };
  }
}