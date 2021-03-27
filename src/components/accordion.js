import React from "react";
import { navigate } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import getSubmissions from "../pages/latest";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

// TODO create new function to call /getFile
// async function getFile(jobid, f_type) {

async function downloadFile(jobid, f_type) {
  let extension = ".csv";
  // TODO create filename based on f_type; pdb is "text/txt" while remaining are .csv
  let filename = jobid + "_" + f_type + extension;
  console.log(jobid, f_type, filename);
  // await getFile(jobid, f_type)
  // downloadString(tit_data, "text/" + extension, filename)
}

export default function ControlledExpansionPanels(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root} style={{ marginBottom: "5px" }}>
      <ExpansionPanel
        expanded={
          {
            /*expanded === "panel1"*/
          }
        }
        onChange={handleChange("panel1")}
      >
        <ExpansionPanelSummary
          onClick={(e) => {
            navigate(`/results?jobid=${props.subid}`, {
              state: { subID: props.subid },
            });
          }}
          expandIcon={<ExpandMoreIcon style={{ transform: "rotate(90deg)" }} />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>#{props.jobid}</Typography>
          <Typography className={classes.secondaryHeading}>
            {props.datetime}
          </Typography>
          <Typography
            className={classes.heading}
            style={{ textAlign: "right" }}
          >
            {props.name}
          </Typography>
        </ExpansionPanelSummary>

        {/*
        <ExpansionPanelDetails>
          <Typography>Download the results</Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <button
            onClick={() => downloadFile(props.jobid, "pkas")}
            style={{ width: "20%", marginRight: "5%", marginLeft: "2.5%" }}
          >
            pK<sub>a</sub>s
          </button>
          <button
            onClick={() => downloadFile(props.jobid, "pdb")}
            style={{ width: "20%", marginRight: "5%" }}
          >
            PDB file
          </button>
          <button
            onClick={() => downloadFile(props.jobid, "titration")}
            style={{ width: "20%", marginRight: "5%" }}
          >
            Titration Curve
          </button>
          <button
            onClick={() => downloadFile(props.jobid, "parameters")}
            style={{ width: "20%" }}
          >
            Parameters
          </button>
        </ExpansionPanelDetails> */}
      </ExpansionPanel>
    </div>
  );
}
