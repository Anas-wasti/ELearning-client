import React from "react";
import { styles } from "../styles/style";
import { useTheme } from "next-themes";

type Props = {};

const Policy = (props: Props) => {
  const { theme } = useTheme();

  return (
    <div>
      <div
        className={`w-[95%] md:w-[92%] m-auto py-2 ${
          theme === "dark" ? "text-white" : "text-black"
        } px-3`}
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>
        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <h1 className={`${styles.title} !text-center`}>Privacy Policy</h1>
            Our platform ensures that every user’s personal information is kept
            completely secure. No data is shared without proper permission, and
            all sensitive details are stored in encrypted form for maximum
            protection. We follow strict guidelines to protect identity and user
            rights at every level. Privacy is always a top priority, and
            continuous monitoring helps us maintain a safe and trustworthy
            system for all users.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <h1 className={`${styles.title} !text-center`}>Refund Policy</h1>
            Refunds are processed only for valid and verified cases where the
            promised service is not delivered. Each request is reviewed
            carefully to ensure a fair outcome for students. The system allows
            users to track the status of their refund easily and clearly. Our
            goal is to provide an honest, transparent, and reliable experience
            to every student who joins the platform.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <h1 className={`${styles.title} !text-center`}>
              Terms & Conditions
            </h1>
            Before using any service, users are required to accept the Terms &
            Conditions that explain usage rights, content rules, and
            responsibilities. We monitor activity to prevent misuse and maintain
            a clean, safe environment. Any violation may result in restricted
            access or further action. Our purpose is to offer an ethical,
            professional, and productive learning experience for everyone.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <h1 className={`${styles.title} !text-center`}>Cookie Policy</h1>
            Cookies are used to improve user experience, speed, and
            personalization across the platform. These help us understand
            behavior and deliver relevant content more effectively. Cookie data
            is used only for performance improvements and never for misuse.
            Users may disable cookies anytime, but doing so may limit certain
            features or reduce functionality on the site.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <h1 className={`${styles.title} !text-center`}>
              Community Guidelines
            </h1>
            Every member of the platform is expected to behave respectfully and
            responsibly at all times. Harassment, spam, hate speech, and harmful
            activities are strictly prohibited. We use active moderation to
            maintain a safe and supportive learning environment. Positive
            communication and ethical engagement are essential for all students
            and instructors.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            <h1 className={`${styles.title} !text-center`}>Security Policy</h1>
            The platform uses advanced security systems, firewalls, and
            protective layers to keep all accounts safe. Login activity is fully
            secured with modern protocols, and sensitive data is guarded at
            every step. Regular testing helps detect and resolve any potential
            risks. We aim to provide the safest and most reliable online
            learning experience possible.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
