import { useEffect, useState } from "react";
import Image from "next/image";
import person from "../assets/person.png";

const TagsInput = () => {
  const textData = [
    { name: "satya biswal", mail: "satya123@gmail.com" },
    { name: "sagar kumar", mail: "sagar@gmail.com" },
    { name: "akshay kumar", mail: "akshay@gmail.com" },
    { name: "xyz swain", mail: "xyz@gmail.com" },
    { name: "swasti behera", mail: "swasti@gmail.com" },
    { name: "akash sharma", mail: "akash@gmail.com" },
    { name: "ashu mohanty", mail: "ashu@gmail.com" },
    { name: "deepak patra", mail: "deepak@gmail.com" },
    { name: "manas munda", mail: "manas@gmail.com" },
    { name: "omm mishra", mail: "om@gmail.com" },
  ];
  const [tags, setTags] = useState<any>([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionData, setSuggestionData] = useState<any>([]);
  const [stylediv, setStyleDiv] = useState("");
  const [text, setText] = useState("");

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
      if (newData && newData.length > 0 && tags.length !== textData.length) {
        setSuggestionData(newData);
      }
      else {
        setSuggestionData([]);
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
    if (data!== "") {
        setShowSuggestion(true);
      if (textData.find((text) => text.name === data.toLowerCase())) {
        if (!tags.includes(data.toLowerCase())) {
          setTags([...tags, data.toLowerCase()]);
          setText("");
        }
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
    if (tags.length > 1) {
        setShowSuggestion(false);
        setTimeout(() =>{
            setShowSuggestion(true)
        },500)
    }else {
        setShowSuggestion(false);
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
      if (stylediv === "" && tags.length > 0) {
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
            value={text}
            onKeyDown={(e) =>
              e.key === "Enter"
                ? handleKeyDown(text)
                : e.key === "Backspace"
                ? highlight(e)
                : ""
            }
            onChange={(e) => {
                setText(e.target.value);
              editSuggestionDataWhileTyping(e);
            }}
            onPointerEnter={updateSuggestionPosition}
            onClick={()=> setShowSuggestion(true)}
            className="tagInput"
            placeholder="Add new user..."
          />
        </div>
        {showSuggestion ? (
          <div className="suggestion" id="suggestion-box">
            {suggestionData &&
              suggestionData.map((data: any, index: number) => (
                <div
                  className="suggestion-contents text-start"
                  key={index}
                  onClick={(e) => handleKeyDown(data.name)}
                >
                  <Image src={person} className="w-[3rem]" alt="alt-image" />
                  <div className="text-xl w-[9rem] md:w-[10rem]">{data.name}</div>
                  <div className="text-slate-400 text-sm">{data.mail}</div>
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
