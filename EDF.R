??edfReader
library(edfReader)
library(jsonlite)


libDir <- system.file("extdata", package="edfReader")

#Input from r-script
list <- input[[1]]


MEPtest <- paste(libDir, list$name, sep='')
CHdr <- readEdfHeader(MEPtest)

TSignals <-readEdfSignals(CHdr, simplify=FALSE ,fragments = TRUE)
TSignals
toJSON(TSignals, force = TRUE)

