needs(magrittr)
set.seed(512)
do.call(rep, input) %>% 
  strsplit(NULL) %>% 
  sapply(sample) %>% 
  apply(2, paste, collapse = "")


library(edfReader)
library(jsonlite)
library(dplyr)
libDir <- system.file("extdata", package="edfReader")




MEPtest <- paste(libDir, "/MEPtest2.edf", sep='')
CHdr <- readEdfHeader(MEPtest)

TSignals <-readEdfSignals(CHdr, simplify=FALSE ,fragments = TRUE)
TSignals
mutate(TSignals = as.character(TSignals))