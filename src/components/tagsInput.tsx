import { useEffect, useState } from "react";
import Image from "next/image";
import person from "../assets/person.png";

const TagsInput = () => {
  const textData = [
    { name: "satya", mail: "satya123@gmail.com" },
    { name: "sagar", mail: "sagar@gmail.com" },
    { name: "akshay", mail: "akshay@gmail.com" },
    { name: "xyz", mail: "xyz@gmail.com" },
    { name: "swasti", mail: "swasti@gmail.com" },
    { name: "akash", mail: "akash@gmail.com" },
    { name: "ashu", mail: "ashu@gmail.com" },
    { name: "deepak", mail: "deepak@gmail.com" },
    { name: "manas", mail: "manas@gmail.com" },
    { name: "om", mail: "om@gmail.com" },
  ];
  const [tags, setTags] = useState<any>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionData, setSuggestionData] = useState<any>([]);
  const [stylediv, setStyleDiv] = useState("");

  //initialize the suggestion data
  useEffect(() => {
    setSuggestionData(textData);
  }, []);

  // generate new data that doesn't include the chips
  const generateNewData = () => {
    let newData: any[] = [];
    textData.map((data: any, index: number) => {
      if (!tags.includes(data.name)) {
        newData[index] = data;
      }
    });
    if (newData.length > 0) {
      return newData;
    }
  };

  //set suggestion data
  const handleSuggestionData = () => {
    if (tags.length > 0) {
      const newData = generateNewData();
      if (newData && newData.length > 0) {
        setSuggestionData(newData);
      }
    } else {
      setSuggestionData(textData);
    }
  };

  //change suggestion data with change of chips
  useEffect(() => {
    handleSuggestionData();
  }, [tags, setTags]);

  //input chips
  const handleKeyDown = (data: any) => {
    if (data.target !== undefined && data.target.value !== "") {
        setShowSuggestion(true);
      if (textData.find((text) => text.name === data.target.value)) {
        if (!tags.includes(data.target.value.toLowerCase())) {
          setTags([...tags, data.target.value.toLowerCase()]);
          data.target.value = "";
          setShowSuggestion(false);
        }
      }
    } else {
      if (!tags.includes(data)) {
        setShowSuggestion(false);
        setTags([...tags, data]);
      }
    }
  };

  //remove chips
  const removeChip = (index: number) => {
    setTags(
      tags.filter((data: any, i: number) => {
        if (i !== index) {
          return data;
        }
      })
    );
    if (stylediv !== "") {
      setStyleDiv("");
    }
  };

  //show suggestions that match what you are typing
  const editSuggestionDataWhileTyping = (e: any) => {
    if (e.target.value !== "") {
        setShowSuggestion(true);
      if (tags.length > 0) {
        const newData = generateNewData();
        if (newData && newData.length > 0) {
          setSuggestionData(
            newData.filter((text: any) => {
              if (text.name.indexOf(e.target.value.toLowerCase()) !== -1) {
                return text;
              }
            })
          );
        }
      } else {
        setSuggestionData(
          textData.filter((text) => {
            if (text.name.indexOf(e.target.value.toLowerCase()) !== -1) {
              return text;
            }
          })
        );
      }
    } else {
        setShowSuggestion(false);
      handleSuggestionData();
    }
  };

  //highlight the last chip
  const highlight = (e: any) => {
    if (e.target.value === "") {
      if (stylediv === "") {
        setStyleDiv(" highlight-properties");
      }
      if (stylediv !== "") {
        removeChip(tags.length - 1);
        setStyleDiv("");
      }
    }
  };

  //decide where suggestion will appear
  const updateSuggestionPosition = (e: any) => {
    const suggestions = document.getElementById("suggestion-box");
    if (suggestions !== null && window.innerWidth >= 768) {
      suggestions.style.left = `${e.clientX}px`;
    }
  };

  return (
    <div>
        <div className="tagsInputContainer">
          {tags.map((tag: any, index: number) => (
            <div
              className={
                `tagItem` + (index === tags.length - 1 ? `${stylediv}` : "")
              }
              key={index}
            >
              <Image src={person} className="w-[2rem]" alt="alt-image" />
              <span className="text">{tag}</span>
              <span
                className="close cursor-pointer"
                onClick={() => removeChip(index)}
              >
                &times;
              </span>
            </div>
          ))}
          <input
            type="text"
            onKeyDown={(e) =>
              e.key === "Enter"
                ? handleKeyDown(e)
                : e.key === "Backspace"
                ? highlight(e)
                : ""
            }
            onChange={(e) => {
              editSuggestionDataWhileTyping(e);
            }}
            onPointerEnter={updateSuggestionPosition}
            onClick={()=> setShowSuggestion(true)}
            className="tagInput"
            placeholder="type something"
          />
        </div>
        {showSuggestion ? (
          <div className="suggestion" id="suggestion-box">
            {suggestionData &&
              suggestionData.map((data: any, index: number) => (
                <div
                  className="suggestion-contents"
                  key={index}
                  onClick={(e) => handleKeyDown(data.name)}
                >
                  <Image src={person} className="w-[3rem]" alt="alt-image" />
                  <span className="text-xl">{data.name}</span>
                  <span className="text-slate-400 text-sm">{data.mail}</span>
                </div>
              ))}
          </div>
        ) : (
          ""
        )}
      </div>
  );
};

export default TagsInput;
