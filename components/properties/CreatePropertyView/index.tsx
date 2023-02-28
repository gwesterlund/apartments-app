import { useState, useEffect, useRef, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import {
  GET_PROPERTIES,
  CREATE_PROPERTY,
} from "@/client/setup/graphlq/queries";

import Details from "./steps/Details";
import Features from "./steps/Features";

const CreatePropertyView = ({}) => {
  const EMPTY_PROPERTY = {
    type: "",
    displayName: "",
    address: {
      street: "",
    },
    owner: {
      //
    },
    manager: {
      //
    },
  };

  const [propertyData, setPropertyData] = useState(EMPTY_PROPERTY);

  const updatePropertyData = (field, value) => {
    const [a, b, c] = field.split(".");

    setPropertyData({
      ...propertyData,
      [a]: b
        ? {
            ...propertyData[a],
            [b]: c
              ? {
                  ...propertyData[a][b],
                  [c]: value,
                }
              : value,
          }
        : value,
    });
  };

  const steps = [
    {
      id: "enter-details",
      title: "Enter Details",
      component: Details,
    },
    {
      id: "select-features",
      title: "Select Features",
      component: Features,
    },
  ];

  const [step, setStep] = useState(0);

  const navigation = {
    prev: () => {
      if (step > 0) setStep(step - 1);
    },
    next: () => {
      if (step < steps.length - 1) setStep(step + 1);
    },
    go: (id) => {
      const newStep = steps.findIndex((e) => e.id === id);
      if (newStep !== -1) setStep(newStep);
    },
  };

  const ref = useRef();
  const router = useRouter();

  useEffect(() => {
    ref.current = { pathname: router.pathname, step };
  }, [router.pathname, step]);

  useEffect(() => {
    // handle browser back button
    router.beforePopState(() => {
      // if on the first step, navigate to previous page
      if (ref.current.step === 0) return true;

      // otherwise, prevent browser navigation and go to previous step
      history.pushState(null, null, ref.current.pathname);
      setStep(ref.current.step - 1);
      return false;
    });
  }, []);

  const [createProperty] = useMutation(CREATE_PROPERTY, {
    refetchQueries: [{ query: GET_PROPERTIES }],
    onCompleted: (data) => {
      //
    },
  });

  const handleSubmit = () => {
    createProperty({
      variables: { data: propertyData },
    });
  };

  const Component = steps[step].component;
  const componentProps = {
    propertyData,
    updatePropertyData,
    navigation,
    handleSubmit,
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <ol className="breadcrumb">
            {steps.map((s, i) => {
              return (
                <li
                  key={steps[i].id}
                  className={`breadcrumb-item ${i === step ? "current" : ""}`}
                >
                  {i < step ? (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigation.go(steps[i].id);
                      }}
                    >
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <Component {...componentProps} />
    </>
  );
};

export default CreatePropertyView;
