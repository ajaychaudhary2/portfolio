import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const CanvasRevealEffect = dynamic(
  () => import("./ui/CanvasRevealEffect").then((mod) => mod.CanvasRevealEffect),
  { ssr: false }
);

const Approach = () => {
  return (
    <section className="w-full py-20">
      <h1 className="heading">
        My AI <span className="text-purple">Workflow</span>
      </h1>

      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4">
        {/* Phase 1: Bullet Points */}
        <Card
          title="Data & Understanding"
          icon={<AceternityIcon order="Phase 1" />}
          des={[
            "Problem understanding and defining goals",
            "Data collection and annotation (CSV, images, COCO JSON)",
            "Data cleaning, EDA, and visualization",
            "Class balancing and feature engineering",
            "Exploratory model training and baseline performance checks",
            "Hyperparameter tuning and architecture selection",
            "Preparing data loaders, augmentations, and split strategies",

          ]}
        >
          <CanvasRevealEffect
            animationSpeed={5.1}
            containerClassName="bg-black-900 rounded-3xl overflow-hidden"
           colors={[
  [28, 35, 65],     // deep navy
  [52, 75, 100],    // muted teal/blue
]}// deeper teal

             
            
          />
        </Card>

        {/* Phase 2: Paragraph */}
        <Card
          title="Modeling & Training"
          icon={<AceternityIcon order="Phase 2" />}
          des={[
            "Model selection: CNN, Faster R-CNN, LLMs (Zephyr-7B)",
  "Training and hyperparameter tuning",
  "Evaluation using accuracy, IOU, F1-score, confusion matrix",
  "Experiment tracking and version control using Git/DVC",
  "Cross-validation and early stopping techniques",
  "Model ensembling or post-processing if required",
  "Documentation of results and comparison with baselines"

          ]}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-pink-900 rounded-3xl overflow-hidden"
            colors={[
              [255, 166, 158],
              [221, 255, 247],
            ]}
            dotSize={2}
          />
        </Card>

        {/* Phase 3: Paragraph */}
        <Card
          title="Deployment & Monitoring"
          icon={<AceternityIcon order="Phase 3" />}
          des={[
            "Deploying via Flask, Streamlit, or Gradio",
  "Integration with Gemini API or Chatbot UI",
  "Dockerizing the app for environment consistency",
  "Hosting on Lightning AI, Render, or HuggingFace Spaces",
  "Monitoring performance & collecting feedback",
  "Retraining and pushing model updates",
  "Maintaining logs, dashboards, and alert systems"

          ]}
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
            colors={[[125, 211, 252]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string | string[];
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center
        dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Corner icons */}
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-30" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-30" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-10">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
          group-hover/canvas-card:opacity-0 transition duration-200 min-w-40 mx-auto flex items-center justify-center"
        >
          {icon}
        </div>

        <h2
          className="dark:text-white text-center text-3xl opacity-0 group-hover/canvas-card:opacity-100
          relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white 
          group-hover/canvas-card:-translate-y-2 transition duration-200"
        >
          {title}
        </h2>

        {/* Description: Handles both string and array */}
        <div
          className="opacity-0 group-hover/canvas-card:opacity-100
          relative z-10 mt-4 group-hover/canvas-card:text-white text-center
          group-hover/canvas-card:-translate-y-2 transition duration-200 text-white/80 text-sm md:text-base"
        >
          {Array.isArray(des) ? (
            <ul className="list-disc list-inside text-left space-y-1">
              {des.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="whitespace-pre-line">{des}</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Button icon with animated border
const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]
          bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"
        />
        <span
          className="inline-flex h-full w-full cursor-pointer items-center 
          justify-center rounded-full bg-slate-950 px-5 py-2 text-purple backdrop-blur-3xl font-bold text-2xl"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

// Plus icon
export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
