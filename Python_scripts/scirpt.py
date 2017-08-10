import csv
import codecs
import sys

def RefineData(filename="restaurants_origin.csv",output_filename="restaurants.csv"): 
		list_of_lexemes = []
		
		with codecs.open(filename)  as f_input, open(output_filename, 'w', newline='\n') as f_output:
			csv_input = csv.reader(f_input)
			csv_output = csv.writer(f_output)
			header = next(csv_input,None)
			csv_output.writerow(header)
			for row in csv_input:
				row[4]=time_converter(row[4])
				end=time_converter(row[5])
				if row[4]>end:
					end=str(int(end)+(24*60))
					row[5]=end
				else:
					row[5]=end
					
				csv_output.writerow(row)

def time_converter(time):
	time = time.replace(" ", "")
	t_splt = time.split(':')
	if t_splt[1][2:] == 'PM' and t_splt[0] != '12':
		t_splt[0] = str(12+ int(t_splt[0]))
	elif int(t_splt[0])==12 and t_splt[1][2:] == 'AM':
		t_splt[0] = '00'
	t_splt[1] = t_splt[1][:2]
	return str((int(t_splt[0])*60)+int(t_splt[1]))

#print(time_converter("9:33 PM"))
RefineData()
