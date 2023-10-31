import React, { useState } from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import FileCopyIcon from "@mui/icons-material/FileCopy";

export default function CopyLinkInput({ longLink, shortLink }) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      setCopied(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Input
        value={longLink}
        fullWidth
        readOnly
        endAdornment={
          <IconButton
            onClick={() => handleCopyClick(longLink)}
            disabled={copied}
          >
            <FileCopyIcon />
          </IconButton>
        }
      />
      <IconButton onClick={() => handleCopyClick(shortLink)} disabled={copied}>
        <FileCopyIcon />
      </IconButton>
    </div>
  );
}
