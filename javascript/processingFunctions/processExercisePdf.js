import { recursiveProcessTextLatex, processTextLatex } from "../parseXmlLatex";
import { getChildrenByTagName, ancestorHasTag } from "../utilityFunctions";

let unlabeledEx = 0;
const processExercisePdf = (node, writeTo) => {
  const label = getChildrenByTagName(node, "LABEL")[0];
  let labelName = "";
  const solution = node.getElementsByTagName("SOLUTION")[0];
  if (solution) {
    if (!label) {
      labelName = "ex:unlabeled" + unlabeledEx;
      unlabeledEx += 1;
    } else {
      labelName = label.getAttribute("NAME");
    }
  }

  writeTo.push(
    "\n\\stepcounter{ExerciseDisplayNumber}\n\\begin{Exercise}\\begin{small}"
  );
  if (solution && !label) {
    writeTo.push("\\label{" + labelName + "}");
  }
  writeTo.push("\\noindent%\n");

  recursiveProcessTextLatex(node.firstChild, writeTo);
  if (solution) {
    //  include the following line for a clickable "Solution"
    //  writeTo.push("\\hfill{\\hyperref[" + labelName + "-Answer]{Solution}}\\\\");
  }
  writeTo.push("\n\\end{small}\\end{Exercise}\n");

  if (solution) {
    /// TODO: change this format
    answers.push("\n\\begin{Answer}[ref={" + labelName + "}]\n");
    recursiveProcessTextLatex(solution.firstChild, answers);
    answers.push("\n\\end{Answer}\n");
  }
};

export default processExercisePdf;
const answers = [];

export const getAnswers = () => {
  return answers;
};
