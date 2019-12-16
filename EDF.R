??edfReader
library(edfReader)
library(jsonlite)


libDir <- system.file("extdata", package="edfReader")




MEPtest <- paste(libDir, "/MEPtest2.edf", sep='')
CHdr <- readEdfHeader(MEPtest)

TSignals <-readEdfSignals(CHdr, simplify=FALSE ,fragments = TRUE)
TSignals
toJSON(TSignals, force = TRUE)

