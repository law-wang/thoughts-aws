/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Post } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function PostUpdateForm(props) {
  const {
    id,
    post,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    time: undefined,
    content: undefined,
    tag: undefined,
    audio: undefined,
  };
  const [time, setTime] = React.useState(initialValues.time);
  const [content, setContent] = React.useState(initialValues.content);
  const [tag, setTag] = React.useState(initialValues.tag);
  const [audio, setAudio] = React.useState(initialValues.audio);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...postRecord };
    setTime(cleanValues.time);
    setContent(cleanValues.content);
    setTag(cleanValues.tag);
    setAudio(cleanValues.audio);
    setErrors({});
  };
  const [postRecord, setPostRecord] = React.useState(post);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Post, id) : post;
      setPostRecord(record);
    };
    queryData();
  }, [id, post]);
  React.useEffect(resetStateValues, [postRecord]);
  const validations = {
    time: [{ type: "Required" }],
    content: [],
    tag: [],
    audio: [{ type: "URL" }],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hour12: false,
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          time,
          content,
          tag,
          audio,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(
            Post.copyOf(postRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "PostUpdateForm")}
    >
      <TextField
        label="Time"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        defaultValue={time && convertToLocal(new Date(time))}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              time: value,
              content,
              tag,
              audio,
            };
            const result = onChange(modelFields);
            value = result?.time ?? value;
          }
          if (errors.time?.hasError) {
            runValidationTasks("time", value);
          }
          setTime(new Date(value).toISOString());
        }}
        onBlur={() => runValidationTasks("time", time)}
        errorMessage={errors.time?.errorMessage}
        hasError={errors.time?.hasError}
        {...getOverrideProps(overrides, "time")}
      ></TextField>
      <TextField
        label="Content"
        isRequired={false}
        isReadOnly={false}
        defaultValue={content}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              time,
              content: value,
              tag,
              audio,
            };
            const result = onChange(modelFields);
            value = result?.content ?? value;
          }
          if (errors.content?.hasError) {
            runValidationTasks("content", value);
          }
          setContent(value);
        }}
        onBlur={() => runValidationTasks("content", content)}
        errorMessage={errors.content?.errorMessage}
        hasError={errors.content?.hasError}
        {...getOverrideProps(overrides, "content")}
      ></TextField>
      <SelectField
        label="Tag"
        placeholder="Please select an option"
        isDisabled={false}
        value={tag}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              time,
              content,
              tag: value,
              audio,
            };
            const result = onChange(modelFields);
            value = result?.tag ?? value;
          }
          if (errors.tag?.hasError) {
            runValidationTasks("tag", value);
          }
          setTag(value);
        }}
        onBlur={() => runValidationTasks("tag", tag)}
        errorMessage={errors.tag?.errorMessage}
        hasError={errors.tag?.hasError}
        {...getOverrideProps(overrides, "tag")}
      >
        <option
          children="Thoughts"
          value="THOUGHTS"
          {...getOverrideProps(overrides, "tagoption0")}
        ></option>
        <option
          children="Playlists"
          value="PLAYLISTS"
          {...getOverrideProps(overrides, "tagoption1")}
        ></option>
        <option
          children="Quotes"
          value="QUOTES"
          {...getOverrideProps(overrides, "tagoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Audio"
        isRequired={false}
        isReadOnly={false}
        defaultValue={audio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              time,
              content,
              tag,
              audio: value,
            };
            const result = onChange(modelFields);
            value = result?.audio ?? value;
          }
          if (errors.audio?.hasError) {
            runValidationTasks("audio", value);
          }
          setAudio(value);
        }}
        onBlur={() => runValidationTasks("audio", audio)}
        errorMessage={errors.audio?.errorMessage}
        hasError={errors.audio?.hasError}
        {...getOverrideProps(overrides, "audio")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex {...getOverrideProps(overrides, "RightAlignCTASubFlex")}>
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
