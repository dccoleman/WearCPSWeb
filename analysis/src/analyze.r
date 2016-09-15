d = read.csv('/Users/chrisnavarro/Desktop/MQP/analysis/results/data.csv', header = TRUE, sep = ",")
barplot(as.integer(d$score),
			width = 5,
			names.arg = d$postId)
png(filename="/Users/chrisnavarro/Desktop/MQP/analysis/results/bartest.png")
