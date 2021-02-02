provider "aws" {
  version = "~> 2.0"
  region  = "eu-west-2"
}

# ECS
resource "aws_ecs_cluster" "node_developer_test_cluster" {
  name = "node-developer-test-cluster"
}

resource "aws_ecs_service" "node_developer_test_service" {
  name            = "node-developer-test-service"
  cluster         = "${aws_ecs_cluster.node_developer_test_cluster.id}"
  task_definition = "${aws_ecs_task_definition.node_developer_test_task.arn}"
  launch_type     = "FARGATE"
  desired_count   = 3

  load_balancer {
    target_group_arn = "${aws_lb_target_group.node_developer_test_target_group.arn}"
    container_name   = "${aws_ecs_task_definition.node_developer_test_task.family}"
    container_port   = 8080
  }

  network_configuration {
    subnets          = ["${aws_default_subnet.default_subnet_a.id}", "${aws_default_subnet.default_subnet_b.id}", "${aws_default_subnet.default_subnet_c.id}"]
    assign_public_ip = true
    security_groups  = ["${aws_security_group.service_security_group.id}"]
  }
}

resource "aws_ecs_task_definition" "node_developer_test_task" {
  family                   = "node-developer-test-task"
  container_definitions    = <<DEFINITION
  [
    {
      "name": "node-developer-test-task",
      "image": "${aws_ecr_repository.node_developer_test.repository_url}",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 8080,
          "hostPort": 8080
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
  DEFINITION
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = "${aws_iam_role.nodeDeveloperTestEcsTaskExecutionRole.arn}"
}

# ECR
resource "aws_ecr_repository" "node_developer_test" {
  name = "node-developer-test"
}

# Elastic Load Balancing v2 (ALB/NLB)
resource "aws_alb" "node_developer_test_load_balancer" {
  name               = "node-developer-test-lb-tf"
  load_balancer_type = "application"
  subnets = [
    "${aws_default_subnet.default_subnet_a.id}",
    "${aws_default_subnet.default_subnet_b.id}",
    "${aws_default_subnet.default_subnet_c.id}"
  ]
  security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = "${aws_alb.node_developer_test_load_balancer.arn}"
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.node_developer_test_target_group.arn}"
  }
}

resource "aws_lb_target_group" "node_developer_test_target_group" {
  name        = "node-developer-test-target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = "${aws_default_vpc.default_vpc.id}"
  health_check {
    matcher = "200,301,302"
    path = "/"
  }
}

# VPC
resource "aws_default_vpc" "default_vpc" {
}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "eu-west-2a"
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "eu-west-2b"
}

resource "aws_default_subnet" "default_subnet_c" {
  availability_zone = "eu-west-2c"
}

resource "aws_security_group" "service_security_group" {
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "load_balancer_security_group" {
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# IAM
resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = "${aws_iam_role.nodeDeveloperTestEcsTaskExecutionRole.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "nodeDeveloperTestEcsTaskExecutionRole" {
  name               = "nodeDeveloperTestEcsTaskExecutionRole"
  assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}
