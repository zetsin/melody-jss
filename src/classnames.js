export default (staticClasses, dynamicClasses) => {
  const combinedClasses = {...staticClasses}

  for (const name in dynamicClasses) {
    combinedClasses[name] = staticClasses[name]
      ? `${staticClasses[name]} ${dynamicClasses[name]}`
      : dynamicClasses[name]
  }

  return combinedClasses
}
