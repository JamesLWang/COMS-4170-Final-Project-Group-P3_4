import json
from flask import Flask, redirect, url_for
from flask import render_template
from flask import Response, request, jsonify
import random
app = Flask(__name__)

LAST_ID = 10	
data = {
	"1":{
		"id": 1,
		"title":  "Gradient-Based Learning Applied to Document Recognition",
		"authors": ["Y. LeCun", "L. Bottou", "Y. Bengio", "P. Haffner"],
		"conference": "IEEE",
		"year": 1998,
		"url": "http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf",
		"abstract": "We trained a large, deep convolutional neural network to classify the 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest into the 1000 different classes. On the test data, we achieved top-1 and top-5 error rates of 37.5% and 17.0% which is considerably better than the previous state-of-the-art. The neural network, which has 60 million parameters and 650,000 neurons, consists of five convolutional layers, some of which are followed by max-pooling layers, and three fully-connected layers with a final 1000-way softmax. To make training faster, we used non-saturating neurons and a very efficient GPU implementation of the convolution operation. To reduce overfitting in the fully-connected layers we employed a recently-developed regularization method called “dropout” that proved to be very effective. We also entered a variant of this model in the ILSVRC-2012 competition and achieved a winning top-5 test error rate of 15.3%, compared to 26.2% achieved by the second-best entry."
	},
	"2":{
		"id": 2,
		"title":  "Fully convolutional networks for semantic segmentation",
		"authors": ["J. Long", "E. Shelhamer","T. Darrell"],
		"conference": "CVPR",
		"year": 2015,
		"url": "https://arxiv.org/pdf/1411.4038v2.pdf",
		"abstract": "Convolutional networks are powerful visual models that yield hierarchies of features. We show that convolutional networks by themselves, trained end-to-end, pixelsto-pixels, exceed the state-of-the-art in semantic segmentation. Our key insight is to build “fully convolutional” networks that take input of arbitrary size and produce correspondingly-sized output with efficient inference and learning. We define and detail the space of fully convolutional networks, explain their application to spatially dense prediction tasks, and draw connections to prior models. We adapt contemporary classification networks (AlexNet [19], the VGG net [31], and GoogLeNet [32]) into fully convolutional networks and transfer their learned representations by fine-tuning [4] to the segmentation task. We then define a novel architecture that combines semantic information from a deep, coarse layer with appearance information from a shallow, fine layer to produce accurate and detailed segmentations. Our fully convolutional network achieves state-of-the-art segmentation of PASCAL VOC (20% relative improvement to 62.2% mean IU on 2012), NYUDv2, and SIFT Flow, while inference takes less than one fifth of a second for a typical image."
        },
	"3":{
		"id": 3,
		"title":  "Perceptual losses for real-time style transfer and super-resolution",
		"authors": ["Justin Johnson", "Alexandre Alahi", "Li Fei-Fei"],
		"conference": "ECCV",
		"year": 2016,
		"url": "https://arxiv.org/pdf/1303.5778.pdf",
		"abstract": "Recurrent neural networks (RNNs) are a powerful model for sequential data. End-to-end training methods such as Connectionist Temporal Classification make it possible to train RNNs for sequence labelling problems where the input-output alignment is unknown. The combination of these methods with the Long Short-term Memory RNN architecture has proved particularly fruitful, delivering state-of-the-art results in cursive handwriting recognition. However RNN performance in speech recognition has so far been disappointing, with better results returned by deep feedforward networks. This paper investigates deep recurrent neural networks, which combine the multiple levels of representation that have proved so effective in deep networks with the flexible use of long range context that empowers RNNs. When trained end-to-end with suitable regularisation, we find that deep Long Short-term Memory RNNs achieve a test set error of 17.7% on the TIMIT phoneme recognition benchmark, which to our knowledge is the best recorded score."
	},
	"4":{
		"id": 4,
		"title":  "Speech recognition with deep recurrent neural networks",
		"authors": ["Graves", "Alex", "Abdel-rahman Mohamed", "Geoffrey Hinton"],
		"conference": "IEEE",
		"year": 2013,
		"url": "https://arxiv.org/pdf/1303.5778.pdf",
		"abstract": "We trained a large, deep convolutional neural network to classify the 1.2 million high-resolution images in the ImageNet LSVRC-2010 contest into the 1000 different classes. On the test data, we achieved top-1 and top-5 error rates of 37.5% and 17.0% which is considerably better than the previous state-of-the-art. The neural network, which has 60 million parameters and 650,000 neurons, consists of five convolutional layers, some of which are followed by max-pooling layers, and three fully-connected layers with a final 1000-way softmax. To make training faster, we used non-saturating neurons and a very efficient GPU implementation of the convolution operation. To reduce overfitting in the fully-connected layers we employed a recently-developed regularization method called “dropout” that proved to be very effective. We also entered a variant of this model in the ILSVRC-2012 competition and achieved a winning top-5 test error rate of 15.3%, compared to 26.2% achieved by the second-best entry."

	},
	"5":{
		"id": 5,
		"title":  "Neural Turing Machines", 
		"authors": ["Alex Graves", "Greg Wayne", "Ivo Danihelka"],
		"conference": "arXiv",
		"year": 2014,
		"url": "https://arxiv.org/pdf/1410.5401.pdf",
		"abstract":"We extend the capabilities of neural networks by coupling them to external memory resources, which they can interact with by attentional processes. The combined system is analogous to a Turing Machine or Von Neumann architecture but is differentiable end-to-end, allowing it to be efficiently trained with gradient descent. Preliminary results demonstrate that Neural Turing Machines can infer simple algorithms such as copying, sorting, and associative recall from input and output examples."

	},
	"6":{
		"id": 6,
		"title":  "ImageNet: A large-scale hierarchical image database",
		"authors": ["Jia Deng", "Wei Dong", "Li-Jia Li", "Kai Li", "Li Fei-Fei"],
		"conference": "IEEE",
		"year": 2009,
		"url": "https://arxiv.org/pdf/1409.0575.pdf",
		"abstract":"The explosion of image data on the Internet has the potential to foster more sophisticated and robust models and algorithms to index, retrieve, organize and interact with images and multimedia data. But exactly how such data can be harnessed and organized remains a critical problem. We introduce here a new database called “ImageNet”, a large-scale ontology of images built upon the backbone of the WordNet structure. ImageNet aims to populate the majority of the 80,000 synsets of WordNet with an average of 500–1000 clean and full resolution images. This will result in tens of millions of annotated images organized by the semantic hierarchy of WordNet. This paper offers a detailed analysis of ImageNet in its current state: 12 subtrees with 5247 synsets and 3.2 million images in total. We show that ImageNet is much larger in scale and diversity and much more accurate than the current image datasets. Constructing such a large-scale database is a challenging task. We describe the data collection scheme with Amazon Mechanical Turk. Lastly, we illustrate the usefulness of ImageNet through three simple applications in object recognition, image classification and automatic object clustering. We hope that the scale, accuracy, diversity and hierarchical structure of ImageNet can offer unparalleled opportunities to researchers in the computer vision community and beyond."

	},
	"7":{
		"id": 7,
		"title":  "Phase transition in the family of p-resistances",
		"authors": ["Morteza Alamgir", "Ulrike Luxburg"],
		"conference": "NIPS",
		"year": 2011,
		"url": "https://papers.nips.cc/paper/2011/file/07cdfd23373b17c6b337251c22b7ea57-Paper.pdf",
		"abstract": "We study the family of p-resistances on graphs for p ≥ 1. This family generalizes the standard resistance distance. We prove that for any fixed graph, for p=1, the p-resistance coincides with the shortest path distance, for p=2 it coincides with the standard resistance distance, and for p → ∞ it converges to the inverse of the minimal s-t-cut in the graph. Secondly, we consider the special case of random geometric graphs (such as k-nearest neighbor graphs) when the number n of vertices in the graph tends to infinity. We prove that an interesting phase-transition takes place. There exist two critical thresholds p^* and p^* such that if p < p^, then the p-resistance depends on meaningful global properties of the graph, whereas if p > p^, it only depends on trivial local quantities and does not convey any useful information. We can explicitly compute the critical values: p^* = 1 + 1/(d-1) and p^ = 1 + 1/(d-2) where d is the dimension of the underlying space (we believe that the fact that there is a small gap between p^* and p^* is an artifact of our proofs. We also relate our findings to Laplacian regularization and suggest to use q-Laplacians as regularizers, where q satisfies 1/p^ + 1/q = 1."

	},
	"8":{
		"id": 8,
		"title":  "How Does Loss Function Affect Generalization Performance of Deep Learning? Application to Human Age Estimation",
		"authors": ["Ali Akbari", "Muhammad Awais", "Manijeh Bashar", "Josef Kittler"],
		"conference": "ICML",
		"year": 2021,
		"url": "http://proceedings.mlr.press/v139/akbari21a/akbari21a.pdf",
		"abstract": "Good generalization performance across a wide variety of domains caused by many external and internal factors is the fundamental goal of any machine learning algorithm. This paper theoretically proves that the choice of loss function matters for improving the generalization performance of deep learning-based systems. By deriving the generalization error bound for deep neural models trained by stochastic gradient descent, we pinpoint the characteristics of the loss function that is linked to the generalization error, and can therefore be used for guiding the loss function selection process. In summary, our main statement in this paper is: choose a stable loss function, generalize better. Focusing on human age estimation from the face which is a challenging topic in computer vision, we then propose a novel loss function for this learning problem. We theoretically prove that the proposed loss function achieves stronger stability, and consequently a tighter generalization error bound, compared to the other common loss functions for this problem. We have supported our findings theoretically, and demonstrated the merits of the guidance process experimentally, achieving significant improvements."

	},
	"9":{
		"id": 9,
		"title":  "Dropout: Explicit Forms and Capacity Control",
		"authors": ["Raman Arora", "Peter Bartlett", "Poorya Mianjy", "Nathan Srebro"],
		"conference": "ICML",
		"year": 2021,
		"url": "http://proceedings.mlr.press/v139/arora21a/arora21a.pdf",
		"abstract": "We investigate the capacity control provided by dropout in various machine learning problems. First, we study dropout for matrix completion, where it induces a distribution-dependent regularizer that equals the weighted trace-norm of the product of the factors. In deep learning, we show that the distribution-dependent regularizer due to dropout directly controls the Rademacher complexity of the underlying class of deep neural networks. These developments enable us to give concrete generalization error bounds for the dropout algorithm in both matrix completion as well as training deep neural networks."
	},
	"10":{
		"id": 10,
		"title":  "Second-Order Neural ODE Optimizer",
		"authors": ["Guan-Horng Liu", "Tianrong Chen", "Evangelos Theodorou"],
		"conference": "NeurIPS",
		"year": 2021,
		"url": "https://papers.nips.cc/paper/2021/file/d4c2e4a3297fe25a71d030b67eb83bfc-Paper.pdf",
		"abstract": "We propose a novel second-order optimization framework for training the emerging deep continuous-time models, specifically the Neural Ordinary Differential Equations (Neural ODEs). Since their training already involves expensive gradient computation by solving a backward ODE, deriving efficient second-order methods becomes highly nontrivial. Nevertheless, inspired by the recent Optimal Control (OC) interpretation of training deep networks, we show that a specific continuoustime OC methodology, called Differential Programming, can be adopted to derive backward ODEs for higher-order derivatives at the same O(1) memory cost. We further explore a low-rank representation of the second-order derivatives and show that it leads to efficient preconditioned updates with the aid of Kronecker-based factorization. The resulting method – named SNOpt – converges much faster than first-order baselines in wall-clock time, and the improvement remains consistent across various applications, e.g. image classification, generative flow, and timeseries prediction. Our framework also enables direct architecture optimization, such as the integration time of Neural ODEs, with second-order feedback policies, strengthening the OC perspective as a principled tool of analyzing optimization in deep learning. Our code is available at https://github.com/ghliu/snopt."

	}
    }
for k in data.keys():
	data[k]['authors'] =  ', '.join(data[k]['authors'])


# ROUTES
@app.route('/')
def welcome():
  return render_template('welcome.html', topK=3, data=random.sample(list(data.values()),3))

@app.route('/add')
def add():
	return render_template('add_entry.html')

def getAuthors(s):
	return s
	res =  s.split(',')
	res = [x.strip() for x in res]
	return res

@app.route('/create', methods=['GET','POST'])
def create():
	global data
	global LAST_ID
	
	LAST_ID += 1
	json_data = request.get_json()
	newEntry = { 
		"id": str(LAST_ID),
		"title":  json_data["paperTitle"],
		"authors": getAuthors(json_data["paperAuthors"]),
		"conference": json_data["paperConference"],
		"year": int(json_data["paperYear"]),
		"url": json_data["paperURL"],
		"abstract": json_data["paperAbstract"]
	}
	
	data[str(LAST_ID)] = newEntry
	
	res ={
		"newItem": "/view/%s" %(str(LAST_ID))
	}
	return jsonify(res=res)

@app.route('/search', methods=['GET','POST'])
def search():
	global data
	
	json_data = request.get_json()
	searchParam_ = str(json_data['key'])
	searchParam = str(json_data['key']).lower()

	res = []
	for k in data.keys():
		candidate = data[k]
		if searchParam in data[k]['title'].lower():
			res.append(candidate)
		elif searchParam.strip() in data[k]['authors'].lower():
			res.append(candidate)
		elif searchParam in data[k]['conference'].lower():
			res.append(candidate)
		elif searchParam.isnumeric() and int(searchParam)==data[k]['year']:
			res.append(candidate)

	res = {
		"res": res,
		"searchTerm": searchParam_
	}
	return jsonify(res=res)

@app.route('/view/<id>')
def view(id):
    global data
    return render_template("view.html", data=data[str(id)])

@app.route('/edit/<id>',  methods=['GET','POST'])
def edit(id):
	global data
	if request.method == 'GET':
		t = ', '.join(data[str(id)]['authors']).strip()
		data[str(id)]["authorsString"] = t
		return render_template("edit.html", data=data[str(id)])
		# return redirect()
	elif request.method == 'POST':
		json_data = request.get_json()
		data[json_data['id']] = json_data
		newRe = "view/" +  str(json_data['id'])
		res = {
			"out": json_data['id']
		}
		return jsonify(res=res)
		return render_template('add_entry.html') # render_template("view.html", data=data[str(id)])


if __name__ == '__main__':
    app.run(debug = True)




