''' 
	Uses data from Belfast-Harbour.co.uk/tide-tables to
	print the tides that are greater than 3.5 meters
'''
import urllib 
import re

url = 'https://www.belfast-harbour.co.uk/tide-tables/'

regexDepth = '<span class="depth">(.+?)</span>' #An array of whatever is between the two span tags 
patternDepth = re.compile(regexDepth) #comile into a form that the re library can use

regexDay = '<span class="day">(.+?)</span>'
patternDay = re.compile(regexDay)

regexOrdinal = '<span class="ordinal">(.+?)</span>'
patternOrdinal = re.compile(regexOrdinal)

regexMonth = '<span class="month">(.+?)</span>'
patternMonth = re.compile(regexMonth)

htmlfile = urllib.urlopen(url)
htmltext = htmlfile.read()
# print htmltext
depthArray  = re.findall(patternDepth,htmltext)
dayArray  = re.findall(patternDay,htmltext)
ordinalArray  = re.findall(patternOrdinal,htmltext)
monthArray  = re.findall(patternMonth,htmltext)

i=0
j=0
k=0
print "Some of the heights may have the incorrect date because the website that the data comes from has some empty boxes in the table"
while i< 7: #There are 30 days but we only want the first 7 
	k = 0 #k gets reset to 0 because of each row
	while k< 4:
		if float(depthArray[j]) >= 3.5 : #if the depth is more than 3.5 meters print it 
			print dayArray[i] + ordinalArray[i] + " " + monthArray[i] + " " + depthArray[j] + "m" #e.g. 20th August 3.7m
		j+=1
		k+=1
	i+=1
